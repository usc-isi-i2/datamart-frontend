import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MetaItem from "./MetaItem";
import Error from "./Error";
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

class MetaContainer extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      result_json: props.resultJson,
      type: props.type
    };
  }

  componentWillMount() {
    this.setState({
      result_json: this.props.resultJson,
      type: this.props.type
    });
  }

  // cwrp
  componentWillReceiveProps(nextProps) {
    this.setState({
      result_json: nextProps.resultJson,
      type: this.props.type
    });
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
                Meta Container
              </Typography>
            </Toolbar>
          </AppBar>

          {this.state.result_json["data"] ? (
            this.state.result_json["data"].map((item, index) => (
              <MetaItem itemJson={item} index={index} type={this.state.type} />
            ))
          ) : (
            <Error errorMsg={this.state.result_json["message"]} />
          )}
        </Grid>
      </Grid>
    );
  }
}

MetaContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MetaContainer);
