import React, { Component, useEffect} from "react";
import "../styles/ListItem.css";
import { withStyles } from "@material-ui/core/styles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import CsvInterface from "./CsvInterface";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import FormGroup from "@material-ui/core/FormGroup";
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
// import Paper from "@material-ui/core/Paper";
// import CSVTable, { RowParser } from "./CSVTable";
// import logger from 'logging-library';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Papa from "papaparse";
// import { CustomErrorComponent } from 'custom-error';

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
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

  wrapper: {
    position: "relative"
  },

  buttonDownload: {
    margin: theme.spacing.unit,
  },

  buttonM: {
    width: 110
  },

  card: {
    position: "relative",
    width: 350,
    minWidth: 250,
    height: 500,
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
    position: "absolute" /*or前面的是absolute就可以用*/,
    bottom: 0
  },

  paper: {
    borderRadius: '4px',
    bottom: 'auto',
    minHeight: '3rem',
    left: '50%',
    // padding: '2rem',
    position: 'fixed',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    minWidth: '15rem',
    width: '80%',
    maxWidth: '80rem',
    maxHeight: '55rem',
    // top: 30,
    // left: 100,
    // position: 'absolute',
    // width: 1400,
    // height: 900,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    alignItems:'center',
    justifyContent:'center',
    overflow: 'scroll',
  }
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class ResultItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // connectionURL: "http://127.0.0.1:9000",
      connectionURL: "http://10.108.20.4:9000",
      // connectionURL: "https://dsbox02.isi.edu:9000",
      index: 0,
      dmId: "",
      title: "",
      source: "",
      score: "",
      isSelected: false,
      displayDialog: false,
      displayDetail: false,
      item_json: {},
      loading: false,
      cannotDownloadOrAugment: false,
      cannotDownloadOriginal: false,
      btnText: "Augment",
      col_num: 0,
      suppliedData: null,
      data: "",
      modalTitle: "",

      downloadChoice: "Save data",
      modalOpen: false,
      onDownloadingCSV: false,
      onDownloadingD3M: false,
      showCsvResult: false,
      showMetadata: false,
      leftJoinPairs: "",
      rightJoinPairs: "",
      // leftJoinPairsNames: "",
      // rightJoinPairsNames: "",
      d3mMetadata: {},
      successAugment: false,
      successDownload: false,
      csvResultAugment: null,
      csvResultDownload: null,
      csvResult: null,
      csvResultFirst10Rows: "",
      running_augment_d3m : false,
      running_augment_csv : false,
      running_download_d3m : false,
      running_download_csv : false,
      
    };
    this.handleFirst10RowsBtn = this.handleFirst10RowsBtn.bind(this);
    this.handleMetaDataBtn = this.handleMetaDataBtn.bind(this);
    this.handleDownloadCSV = this.handleDownloadCSV.bind(this);
    this.handleDownloadD3M = this.handleDownloadD3M.bind(this);
    this.handleAugmentCSV = this.handleAugmentCSV.bind(this);
    this.handleAugmentD3M = this.handleAugmentD3M.bind(this);
  }


  componentWillMount() {
    // console.log("kw", this.props.item_json["metadata"]["keywords"]);
    var len = 0;
    console.log("This received data is ", this.props);
    if (this.props.item_json["metadata"]) {
      len = this.props.item_json["summary"]["Columns"].length;
    }

    this.setState({
      item_json: this.props.item_json,
      index: this.props.index,
      dmId: this.props.item_json["id"],
      title: this.props.item_json["summary"]["title"],
      source: this.props.item_json["summary"]["url"],
      score: this.props.item_json["score"],
      description: this.props.item_json["summary"]["Columns"],
      downloadURL: this.props.item_json["summary"]["URL"],
      col_num: len,
      leftJoinPairs: JSON.stringify(this.props.item_json["augmentation"]['left_columns']),
      rightJoinPairs: JSON.stringify(this.props.item_json["augmentation"]['right_columns']),
      // leftJoinPairsNames: JSON.stringify(this.props.item_json["augmentation"]['left_columns_names']),
      // rightJoinPairsNames: JSON.stringify(this.props.item_json["augmentation"]['right_columns_names']),
      suppliedData: this.props.suppliedData,
      d3mMetadata: this.props.item_json["metadata"],
      csvResultFirst10Rows: this.props.item_json["sample"],
    });
    if (this.props.item_json["augmentation"]['left_columns'].length === 0) {
      this.setState({
        cannotDownloadOrAugment: true,
      })
    };
    const materilize_info = JSON.parse(this.props.item_json["materialize_info"]);
    console.log("search type", materilize_info);
    if (materilize_info["metadata"]["search_type"] !== "general" && materilize_info["metadata"]["search_type"] !== undefined) {
      this.setState({
        cannotDownloadOriginal: true,
      })
    };
  }

  // cwrp
  componentWillReceiveProps(nextProps) {
    // console.log("nextProps get as", nextProps);
    this.setState({
      item_json: nextProps.item_json,
      index: nextProps.index,
      suppliedData: nextProps.suppliedData,
    });
  }

  componentWillUnmount() {
    // clearTimeout(this.timer);
  }

  handleDisplay(actionName) {
    console.log("Now " + actionName + "...");
    if (actionName === "augment" && this.state.successAugment) {
      console.log("Already ran once augment");
      this.setState({
        csvResult: this.state.csvResultAugment,
        showCsvResult: true,
        showMetadata: false,
        modalOpen: true,
      });
    } 
    else if (actionName === "download" && this.state.successDownload) {
      console.log("Already ran once download");
      this.setState({
        csvResult: this.state.csvResultDownload,
        showCsvResult: true,
        showMetadata: false,
        modalOpen: true,
      });
    } 
    else if (!this.state.loading) {
      this.setState(
        {
          loading: true,
        },
        () => {
          // create url
          var url = this.state.connectionURL + "/" + actionName + "?";
          console.log("supplied data is", this.state.suppliedData);
          const suppliedDataType = this.state.suppliedData.type;

          console.log("suppliedData type is", suppliedDataType);
          if (typeof this.state.suppliedData === 'string' || this.state.suppliedData instanceof String) {
            console.log("append string as supplied data");
            url += "data=";
            url += this.state.suppliedData;
            url += "&format=csv";
          }
          else {
            url += "format=csv";
          }

          console.log("Sending "+ actionName + " url as ", url)
          // create FormData
          var formData = new FormData();
          // add supplied data in file if the supplied data is from upload
          if (suppliedDataType !== "string") {
            console.log("append data as supplied data");
            formData.append(
              "data",
              this.state.suppliedData
            );
          }
          // append task
          formData.append(
              "task",
              JSON.stringify(this.props.item_json)
            );
          // finish append, start query
          fetch(url, {
            method: "POST",
            body: formData,
            mode: "cors",
            headers: {
              enctype: "multipart/form-data",
              processData: false,
              cache: false,
              contentType: false
            }
          })
          .then(response => {
            console.log("response is ", response)
            return response;
          })
          .then(response => {
            // console.log("json is ", json)
            if (response === undefined) {
              return;
            } 
            else {
              if (response.code == "400") {
                this.setState({
                  btnText: "Failed"
                });
                //TODO: add modal that show "failed"
                console.log("get " + actionName + " result failed");
              }
              else {
                const responseBody = response.body;
                const reader2 = responseBody.getReader();
                const decoder = new TextDecoder('utf-8');
                var csvResultReaded = reader2.read()
                .then(({value, done}) => {
                  const csvResultDecoded = decoder.decode(value);
                  if (actionName === "augment") {
                    this.setState({
                      csvResultAugment: csvResultDecoded,
                      successAugment: true,
                    })
                  }
                  else if (actionName === "download") {
                    this.setState({
                      csvResultDownload: csvResultDecoded,
                      successDownload: true,
                    })
                  };
                  
                  console.log("get " + actionName + " result success");
                  this.setState(
                    {
                      modalTitle: actionName + " results for " + this.state.title,
                      csvResult: csvResultDecoded,
                      loading: false,
                      modalOpen: true,
                      // btnText: "Open",
                      showCsvResult: true,
                      showMetadata: false,
                      downloadChoice: "Download data",
                    });
                })
              };
            }
          })
        }
      )
    }
  };

  handleSaveAsFunction(actionName, downloadFormat) {
    var url = this.state.connectionURL + "/" + actionName + "?";
    const suppliedDataType = this.state.suppliedData.type.toString()
    var fileSuffix = ""
    if (downloadFormat === "csv") {
      fileSuffix = ".csv";
    }
    else {
      fileSuffix = ".zip";
    }
    console.log("suppliedData type is", suppliedDataType);
    if (suppliedDataType === "string") {
      url += "data=";
      url += this.state.suppliedData;
      url += "&format=csv";
    }
    else {
      url += "format=csv";
    };

    // disable the button
    if (actionName === "download" && downloadFormat === "csv") {
      this.setState({
        running_download_csv : true,
      });
    }
    else if (actionName === "download" && downloadFormat === "d3m") {
      this.setState({
        running_download_d3m : true,
      });
    }
    else if (actionName === "augment" && downloadFormat === "csv") {
      this.setState({
        running_augment_csv : true,
      });
    }
    else if (actionName === "augment" && downloadFormat === "d3m") {
      this.setState({
        running_augment_d3m : true,
      });
    } 
    
    console.log("Sending url as ", url);

    // create FormData
    var formData = new FormData();
    // add supplied data in file if the supplied data is from upload
    if (suppliedDataType !== "string") {
      formData.append(
        "data",
        this.state.suppliedData
      );
    }
    // append task
    formData.append(
        "task",
        JSON.stringify(this.props.item_json)
    );
    console.log("Sending form data as ", formData)

    fetch(url, {
            method: "POST",
            body: formData,
            mode: "cors",
            headers: {
              enctype: "multipart/form-data",
              processData: false,
              cache: false,
              contentType: false
            }
          })
    .then(response => response.blob())
      .then(blob => {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download =  actionName + "_result_for_" + this.state.title.replace(" ", "_") + fileSuffix;
          document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
          a.click();    
          a.remove();  //afterwards we remove the element again         
      });
    
    if (actionName === "download" && downloadFormat === "csv") {
      console.log("1");
      this.setState({
        running_download_csv : false,
      });
    }
    else if (actionName === "download" && downloadFormat === "d3m") {
      console.log("2");
      this.setState({
        running_download_d3m : false,
      });
    }
    else if (actionName === "augment" && downloadFormat === "csv") {
      console.log("3");
      this.setState({
        running_augment_csv : false,
      });
    }
    else if (actionName === "augment" && downloadFormat === "d3m") {
      console.log("4");
      this.setState({
        running_augment_d3m : false,
      });
    } 
  };

  handleAugmentCSV = () => {
    this.handleSaveAsFunction("augment", "csv");
  };

  handleAugmentD3M = () => {
    this.handleSaveAsFunction("augment", "d3m");
  };

  handleDownloadCSV = () => {
    this.handleSaveAsFunction("download", "csv");
  };

  handleDownloadD3M = () => {
    this.handleSaveAsFunction("download", "d3m");
  };

  handleAugmentBtn = () => {
    this.handleDisplay("augment");
  };

  handleDownloadBtn = () => {
    this.handleDisplay("download");
  };

  handleDownloadOriginalData = () => {
    window.open(this.state.downloadURL, "_blank");
  };

  handleMetaDataBtn = () => {
    console.log("open new tag for meta data");
    this.setState({
      modalTitle: "D3M Metadata for " + this.state.title,
      loading: false,
      modalOpen: true,
      showMetadata: true,
      showCsvResult: false,
    })

  };

  handleFirst10RowsBtn = () => {
    if (this.state.csvResultFirst10Rows != "") {
      console.log("Found first 10 rows data.");
      this.setState({
        modalTitle: "First 10 rows data for " + this.state.title,
        csvResult: this.state.csvResultFirst10Rows,
        loading: false,
        modalOpen: true,
        showMetadata: false,
        showCsvResult: true,
      });
    } 
  };

  render() {
    console.log("res item render");
    const { classes } = this.props;
    var JSONPrettyMon = require('react-json-pretty/dist/adventure_time');
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent className={classes.content}>
            <Typography
              // gutterBottom
              variant="h5"
              component="h2"
              className={classes.title}
            >
              {this.state.title}
            </Typography>
            <Typography component="p">{this.state.dmId}</Typography>
            <Typography component="p" className={classes.url}>
              {this.state.source}
            </Typography>
            <Typography component="p">
              <b>Score</b>: {this.state.score}
            </Typography>
            <Typography component="p">
              <b>Number of Columns</b>: {this.state.col_num}
            </Typography>
            <Typography component="p">
              <b>Left Join pairs</b>: {this.state.leftJoinPairs}
            </Typography>
            <Typography component="p">
              <b>Right Join pairs</b>: {this.state.rightJoinPairs}
            </Typography>
            <Typography component="p" className={classes.text}>
              <div>
                { // divide each column names into multiple lines
                  this.state.description
                    .map(item => <div>{item}</div>)
                    .reduce((acc, x) => acc === null ? [x] : [acc, x], null)
                }
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.action}>
          <FormGroup row className={classes.row}>
            <div className={classes.wrapper}>
              <Button
                size="small"
                color="primary"
                className={classes.buttonM}
                disabled={this.state.loading || this.state.cannotDownloadOrAugment}
                onClick={this.handleAugmentBtn}
              >
                {this.state.btnText}
              </Button>
              {this.state.loading && <LinearProgress />}
            </div>
            <Button
              size="small"
              className={classes.buttonM}
              color="primary"
              disabled={this.state.loading || this.state.cannotDownloadOrAugment}
              onClick={this.handleDownloadBtn}
            >
              Download
            </Button>
          </FormGroup>
          <FormGroup row className={classes.row}>
            <Button
              size="small"
              className={classes.buttonM}
              color="primary"
              onClick={this.handleMetaDataBtn}
              disabled={this.state.loading}
            >
              Metadata
            </Button>
            <Button
              size="small"
              className={classes.buttonM}
              color="primary"
              onClick={this.handleFirst10RowsBtn}
              disabled={this.state.loading}
            >
              First 10 Rows
            </Button>
          </FormGroup>
        </CardActions>

        <div>
          <Modal
            aria-labelledby="search_result_display_modal"
            aria-describedby="this modal is used  to display the table like data for aumgent and original data."
            open={this.state.modalOpen}
            onClose={() => this.setState({modalOpen: false, showCsvResult: false, showMetadata: false})}
          >
            <div className={classes.paper}>
              <FormGroup row className={classes.row}>
                <h3 id="download-choice">{this.state.downloadChoice}</h3>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonDownload}
                  onClick={this.handleAugmentCSV}
                  labelWidth="2000"
                  disabled={this.state.running_augment_csv || this.state.cannotDownloadOrAugment}
                >
                  Augment CSV
                  <CloudDownloadIcon className={classes.rightIcon} />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonDownload}
                  onClick={this.handleAugmentD3M}
                  labelWidth="2000"
                  disabled={this.state.running_augment_d3m || this.state.cannotDownloadOrAugment}
                >
                  AUGMENT D3M
                  <CloudDownloadIcon className={classes.rightIcon} />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonDownload}
                  onClick={this.handleDownloadCSV}
                  labelWidth="2000"
                  disabled={this.state.running_download_csv || this.state.cannotDownloadOrAugment}
                >
                  DOWNLOAD CSV
                  <CloudDownloadIcon className={classes.rightIcon} />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonDownload}
                  onClick={this.handleDownloadD3M}
                  labelWidth="2000"
                  disabled={this.state.running_download_d3m || this.state.cannotDownloadOrAugment}
                >
                  DOWNLOAD D3M
                  <CloudDownloadIcon className={classes.rightIcon} />
                </Button>
              <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonDownload}
                  onClick={this.handleDownloadOriginalData}
                  labelWidth="2000"
                  disabled={this.state.running_download_original || this.state.cannotDownloadOriginal}
                >
                  ORIGINAL DATA
                  <CloudDownloadIcon className={classes.rightIcon} />
                </Button>
              </FormGroup>
              <FormGroup row className={classes.row}>
                <h2 id="transition-modal-title">{this.state.modalTitle}</h2>
              </FormGroup>

              {
                this.state.showCsvResult === false ? (
                  null
                  ) : (
                  <CsvInterface inputData={this.state} />
                  )
              }

              {
                this.state.showMetadata === false ? (
                  null
                  ) : (
                  <JSONPretty 
                  id="json-pretty" 
                  theme={JSONPrettyMon}
                  data={this.state.d3mMetadata}
                  onJSONPrettyError={e => console.error(e)}
                  >
                  </JSONPretty>
                )
              }

            </div>
          </Modal>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(ResultItem);
