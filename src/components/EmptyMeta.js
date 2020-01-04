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

class EmptyMeta extends Component {
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
          <AppBar position="static" />
        </Grid>
      </Grid>
    );
  }
}

EmptyMeta.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmptyMeta);
