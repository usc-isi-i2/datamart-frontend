import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MainPage from "./MainPage";
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

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={MainPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
