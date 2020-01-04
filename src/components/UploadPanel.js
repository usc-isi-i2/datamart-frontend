import React, { Component } from "react";
// import { BrowserRouter, Route } from "react-router-dom";
// import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import SingleFile from "./SingleFile";
import MultipleTables from "./MultipleTables";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

function TabContainer(props) {
  return <div>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white"
  },

  query: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },

  page_title: {
    margin: "auto"
  },

  tab_container: {
    display: "flex" /**/,
    justifyContent: "center" /*水平居中*/,
    alignItems: "center" /*垂直居中*/
  }
});

class UploadPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({
      value: value
    });
  };

  render() {
    const { classes } = this.props;
    const index = this.state.value;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            fullWidth
            value={index}
            // indicatorColor="secondary"
            // textColor="primary"
            onChange={this.handleChange}
          >
            <Tab label="Upload Single File" />
            <Tab label="Upload Multiple File" />
          </Tabs>
        </AppBar>
        {index === 0 && (
          <TabContainer className={classes.tab_container}>
            <SingleFile />
          </TabContainer>
        )}
        {index === 1 && (
          <TabContainer className={classes.tab_container}>
            <MultipleTables />
          </TabContainer>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(UploadPanel);
