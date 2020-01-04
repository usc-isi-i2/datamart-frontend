import React, { Component } from "react";
import "../styles/ListItem.css";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import ReactJson from "react-json-view";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit
  },

  index: {
    fontWeight: 800,
    color: "#3f51b5",
    fontSize: "1.1em"
  },

  buttonM: {
    // width: 150
  },

  card: {
    position: "relative",
    // width: 350,
    // minWidth: 250,
    // height: 400,
    margin: "0.5em"
  },

  content: {
    position: "relative",
    margin: "0.5em",
    padding: 10
  },

  text: {
    marginTop: 8,
    fontSize: "1rem",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 5,
    overflow: "hidden"
  },

  url: {
    marginTop: 8,
    marginBottom: 8,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden"
  },

  title: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden"
  },

  action: {
    display: "-webkit-flex",
    display: "flex",
    "-webkit-align-items": "center",
    alignItems: "center",
    "-webkit-justify-content": "center",
    justifyContent: "center"
  }
});

class MetaItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      loading: false,
      success: false,
      btnText: "Upload",
      item_json: {},
      type: "single"
    };

    this.handleUploadBtn = this.handleUploadBtn.bind(this);
  }

  componentWillMount() {
    this.setState({
      item_json: this.props.itemJson,
      index: this.props.index,
      type: this.props.type
    });

    // console.log("item json", this.props.itemJson);
  }

  // cwrp
  componentWillReceiveProps(nextProps) {
    this.setState({
      item_json: nextProps.itemJson,
      index: nextProps.index,
      type: nextProps.type
    });

    // console.log("item json", nextProps.itemJson);
  }

  handleUploadBtn = () => {
    console.log("handle Upload");

    if (this.state.success) {
      this.setState({
        btnText: "Uploaded Successfully"
      });
    } else if (!this.state.loading) {
      this.setState(
        {
          loading: true,
          btnText: "Uploading"
        },
        () => {
          // create url
          var url = "http://dsbox02.isi.edu:9000/new/upload_metadata_list";

          // create payload
          var data_payload = {};

          // fill payload
          if (this.state.item_json) {
            if (this.state.type === "single") {
              data_payload["metadata"] = [this.state.item_json];
            } else {
              data_payload["metadata"] = [this.state.item_json[0]];
            }
          }

          console.log("upload payload", data_payload);

          fetch(url, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data_payload),
            headers: {
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
                if (json["code"] === "0000") {
                  console.log("upload success");
                  this.setState({
                    loading: false,
                    success: true,
                    btnText: "Uploaded Successfully"
                  });
                } else {
                  this.setState({
                    btnText: "Failed"
                  });

                  console.log("materialize failed");
                }
              }
            });
        }
      );
    }
  };

  render() {
    console.log("meta item render");
    const { classes } = this.props;

    return (
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            {this.state.type === "single" ? (
              <Typography variant="h5" component="h2" className={classes.title}>
                {this.state.item_json["title"]}
              </Typography>
            ) : (
              <Typography variant="h5" component="h2" className={classes.title}>
                {this.state.item_json[0]["title"]}
              </Typography>
            )}

            {this.state.type === "single" ? (
              <ReactJson src={this.state.item_json} />
            ) : (
              <ReactJson src={this.state.item_json[0]} />
            )}
          </CardContent>

          <CardActions className={classes.action}>
            <div className={classes.wrapper}>
              <Button
                size="small"
                color="primary"
                className={classes.buttonM}
                disabled={this.state.loading}
                onClick={this.handleUploadBtn}
              >
                {this.state.btnText}
              </Button>
              {this.state.loading && <LinearProgress />}
            </div>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(MetaItem);
