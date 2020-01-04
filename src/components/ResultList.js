import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ResultItem from "./ResultItem";

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
  },

  input: {
    margin: "1em",
    height: "100%"
  },

  list: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    // maxHeight: 600,
    paddingTop: 0
  },

  listSection: {
    backgroundColor: "inherit"
  },

  ul: {
    backgroundColor: "inherit",
    padding: 10
  }
});

class ResultList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result_json: props.resultJson
    };
  }

  componentWillMount() {
    this.setState({
      result_json: this.props.resultJson
    });
  }

  // cwrp
  componentWillReceiveProps(nextProps) {
    this.setState({
      result_json: nextProps.resultJson
    });
  }

  render() {
    const { classes } = this.props;
    // console.log("This data is: ", this.state.result_json["results"]);
    console.log("supplied data is: ", this.state.result_json.suppliedData);

    // console.log("Class is: ", classes.json);
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
          <List className={classes.list}>
            {[0].map((item, index) => (
              <li className={classes.listSection}>
                <ul className={classes.ul}>
                  <ListSubheader>Results</ListSubheader>
                  <div className={classes.row}>
                    {this.state.result_json["results"].map((item, index) => (
                      <ResultItem item_json={item} index={index} suppliedData={this.state.result_json.suppliedData} />
                    ))}
                  </div>
                </ul>
              </li>
            ))}
          </List>
        </Grid>
      </Grid>
    );
  }
}

ResultList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResultList);
