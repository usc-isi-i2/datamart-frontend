import React, { Component } from "react";
// import { BrowserRouter, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchPanel from "./SearchPanel";
import UploadPanel from "./UploadPanel";
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
    flexGrow: 1
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

class MainPage extends Component {
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
      <div>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar className={classes.page_title}>
              <Typography variant="title" color="inherit" align="center">
                Data Mart Link Panel
              </Typography>
            </Toolbar>
            <Tabs fullWidth value={index} onChange={this.handleChange}>
              <Tab label="Search" />
              <Tab label="Upload" />
            </Tabs>
          </AppBar>
          {index === 0 && (
            <TabContainer className={classes.tab_container}>
              <SearchPanel />
            </TabContainer>
          )}
          {index === 1 && (
            <TabContainer className={classes.tab_container}>
              <UploadPanel />
            </TabContainer>
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MainPage);
