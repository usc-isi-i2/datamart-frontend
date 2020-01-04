import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    BorderTop: "2em"
  },

  row: {
    display: "flex",
    flexWrap: "wrap"
  },

  root: {
    flexGrow: 1,
    width: "100%"
  },

  list_title: {
    margin: "auto"
  }
});

class Empty extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        alignItems="stretch"
        direction="column"
        justify="flex-start"
      >
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar className={classes.list_title}>
              <Typography
                variant="headline"
                component="h3"
                color="inherit"
                align="center"
              >
                Result List
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    );
  }
}

Empty.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Empty);
