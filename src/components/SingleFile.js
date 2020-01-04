import React, { Component } from "react";
// import { BrowserRouter, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import EmptyMeta from "./EmptyMeta";
import MetaContainer from "./MetaContainer";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    BorderTop: "2em"
  },

  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    width: "100%"
  },

  input: {
    margin: "1em",
    height: "100%",
    width: "80%"
  },

  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  input_title: {
    width: "-webkit-fill-available",
    marginLeft: 10
  },

  button: {
    margin: theme.spacing.unit
  },

  ins: {
    marginTop: "0.8em"
  },

  form: {
    width: "100%"
  },

  rightIcon: {
    marginLeft: theme.spacing.unit
  },

  fileName: {
    margin: "0.5em",
    maxWidth: "15em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "inline-block"
  }
});

class SingleFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      file_type: "",
      title: "",
      description: "",
      keywords: "",
      result_json: {},
      loading: false,
      success: false,
      btnText: "Submit"
    };

    this.fetchData = this.fetchData.bind(this);
  }

  // async
  fetchData() {
    console.log("SUBMIT upload single");
    // create url
    var url = "http://dsbox02.isi.edu:9000/new/get_metadata_single_file";
    // console.log("query", this.state.query);

    // create payload
    var data_payload = { materialization_arguments: {} };

    // fill payload
    if (this.state.url) {
      data_payload.materialization_arguments["url"] = this.state.url;
    }

    if (this.state.file_type) {
      data_payload.materialization_arguments[
        "file_type"
      ] = this.state.file_type;
    }

    if (this.state.title) {
      data_payload["title"] = this.state.title;
    }

    if (this.state.description) {
      data_payload["description"] = this.state.description;
    }

    if (this.state.keywords) {
      data_payload["keywords"] = this.state.keywords.split("|");
    }

    console.log(data_payload);

    // make request
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data_payload),
      mode: "cors",
      headers: {
        enctype: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json === undefined) {
          return;
        } else {
          this.setState({
            result_json: json,
            loading: false,
            success: true,
            btnText: "Submit"
          });
          console.log("success fetch", json);
        }
      });
  }

  handleValChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = () => {
    console.log("submit upload");
    this.setState({
      loading: true,
      btnText: "Generating Data"
    });
    this.fetchData();
  };

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
        <Typography variant="h4" className={classes.ins}>
          Please upload a description json for your dataset
        </Typography>

        <Grid item xs={12} className={classes.input}>
          <FormControl className={classes.form}>
            <FormGroup row className={classes.row}>
              <Typography
                variant="title"
                color="primary"
                className={classes.input_title}
              >
                - URL (The url for downloading the data file or extracting the
                html table) *
              </Typography>
              <TextField
                id="url"
                style={{ margin: 8 }}
                helperText="Required"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={this.handleValChange("url")}
              />

              <Typography
                variant="title"
                color="primary"
                className={classes.input_title}
              >
                - File Type (one of &quot;csv&quot;, &quot;excel&quot;,
                &quot;html&quot;, &quot;json&quot;) *
              </Typography>
              <TextField
                id="fileType"
                style={{ margin: 8 }}
                helperText="Required"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={this.handleValChange("file_type")}
              />

              <Typography
                variant="title"
                color="primary"
                className={classes.input_title}
              >
                - Title
              </Typography>
              <TextField
                id="title"
                style={{ margin: 8 }}
                helperText="Optional"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={this.handleValChange("title")}
              />

              <Typography
                variant="title"
                color="primary"
                className={classes.input_title}
              >
                - Description
              </Typography>
              <TextField
                id="description"
                style={{ margin: 8 }}
                helperText="Optional"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={this.handleValChange("description")}
              />

              <Typography
                variant="title"
                color="primary"
                className={classes.input_title}
              >
                - Keywords (split by &quot;|&quot;)
              </Typography>
              <TextField
                id="keywords"
                style={{ margin: 8 }}
                helperText="Optional"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={this.handleValChange("keywords")}
              />

              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleSubmit}
                  disable={this.state.success}
                >
                  {this.state.btnText}
                  <CloudUploadIcon className={classes.rightIcon} />
                </Button>
                {this.state.loading && <LinearProgress />}
              </div>
            </FormGroup>
          </FormControl>
        </Grid>
        <Typography variant="subtitle1">
          - When submitted, please wait for a while until you got a json
          response with success/fail message and the metadata generated.
        </Typography>

        <Typography variant="subtitle1">
          - Check or modify the returned metadata, if you would like to index it
          into ISI-Datamart, click on the corresponding upload button.
        </Typography>

        {this.state.success ? (
          <MetaContainer resultJson={this.state.result_json} type="single" />
        ) : (
          <EmptyMeta />
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(SingleFile);
