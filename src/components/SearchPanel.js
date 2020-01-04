import React, { Component } from "react";
// import { BrowserRouter, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Tooltip from '@material-ui/core/Tooltip';
import Select from "@material-ui/core/Select";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SearchIcon from "@material-ui/icons/Search";
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ResultList from "./ResultList";
import Empty from "./Empty";
import MouseOverPopover from "./mouseOverPopover";
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
    height: "100%"
  },

  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  paper: {
    opacity: 0.6,
    borderRadius: "1em",
    paddingLeft: "2em",
    paddingRight: "2em"
  },

  button: {
    margin: theme.spacing.unit
    // position: "absolute"
  },

  leftIcon: {
    marginRight: theme.spacing.unit
  },

  rightIcon: {
    marginLeft: theme.spacing.unit
  },

  iconSmall: {
    fontSize: 20
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },

  textFieldNum: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250
  },

  upload: {
    display: "none"
  },

  fileName: {
    marginLeft: "1em",
    margin: "-0.5em",
    maxWidth: "150em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "inline-block"
  },

  searchMessage: {
    fontSize: 20,
    marginLeft: "0em",
    margin: "0.5em",
    maxWidth: "150em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "inline-block"
  }

});
class SearchPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // connectionURL: "http://10.108.20.4:9000",
      connectionURL: "http://127.0.0.1:9000",
      // connectionURL: "https://dsbox02.isi.edu:9000",
      maxDocsNum: "",
      query: "",
      // full_query: '{\n\t"dataset": {\n\t\t"about": "gold"\n\t}\n}',
      runWikifier: true,
      aumentWithTime: false,
      considerWikifierColumnsOnly: false,
      result_json: {},
      loading: true,
      fileName: "No File Chosen",
      supplied_data_mode: "Not chosen",
      showUploadButton: false,
      shownInputDatasetTextBox: false,
      shownInputFilepathTextBox: false,
      inputTextBoxContent: "",
      showSearchMessage: false,
      onSearching: false,
      datasetID: "DA_poverty_estimation",
      keywords: "",
      variables: "",
      time_search_option: "augment_with_time_only",
    };

    this.keyPress = this.keyPress.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  _onChange(event) {
    // according to different supplied data format, change rendering
    const target = event.target;
    const supplied_data_mode = target.value
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;
    if (supplied_data_mode === "chose_from_local") {
      console.log("use file");
      this.setState({
        showUploadButton: true,
        shownInputDatasetTextBox: false,
        shownInputFilepathTextBox: false,
        supplied_data_mode: "chose_from_local",
      });

    }
    else if (supplied_data_mode === "d3mDatasetID") {
      console.log("use id");
      // document.getElementById("fileName").innerHTML = "GGGGG";
      this.setState({
        showUploadButton: false,
        shownInputDatasetTextBox: true,
        shownInputFilepathTextBox: false,
        supplied_data_mode: "d3mDatasetID",
      });
      
    }
    else if (supplied_data_mode === "filepath") {
      console.log("use filepath")
      this.setState({
        showUploadButton: false,
        shownInputDatasetTextBox: false,
        shownInputFilepathTextBox: true,
        supplied_data_mode: "filepath",
      });
    }
    else if (supplied_data_mode === "withoutData") {
      // TODO: why this do not remove the last state's box?
      console.log("withoutData")
      this.setState({
        showUploadButton: false,
        shownInputDatasetTextBox: false,
        shownInputFilepathTextBox: false,
        supplied_data_mode: "withoutData",
      });
    }
  }

  _onChangeTimeOption(event) {
    // according to different supplied data format, change rendering
    const target = event.target;
    const mode = target.value
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;
    if (mode === "augment_with_time_only") {
      console.log("augment_with_time_only");
      this.setState({
        time_search_option: "augment_with_time_only"
      });

    }
    else if (mode === "augment_with_time_and_attribute") {
      console.log("augment_with_time_and_attribute");
      this.setState({
        time_search_option: "augment_with_time_and_attribute"
      });
      
    }
    else if (mode === "no_augment_on_time") {
      console.log("no_augment_on_time")
      this.setState({
        time_search_option: "no_augment_on_time"
      });
    }
  }

  // async
  fetchData() {
    this.setState({
                onSearching: true,
                showSearchMessage: true,
              });
    // create url
    const supplied_data_mode = this.state.supplied_data_mode
    if (supplied_data_mode === "withoutData") {
      var url = this.state.connectionURL + "/search_without_data?";
    }
    else {
      var url = this.state.connectionURL + "/search?";
    };
    
    if (this.state.maxDocsNum) {
      url += "max_return_docs=";
      url += this.state.maxDocsNum;
    }
    else {
      url += "max_return_docs=20"
    };

    if (supplied_data_mode === "d3mDatasetID") {
      url += "&data=";
      url += this.state.datasetID;
    };

    if (supplied_data_mode === "filepath") {
      url += "&data=";
      url += this.state.filepath;
    };

    if (this.state.runWikifier) {
      url += "&run_wikifier=true"
    }
    else {
      url += "&run_wikifier=false"
    };

    if (this.state.considerWikifierColumnsOnly) {
      url += "&consider_wikifier_columns_only=true"
    }
    else {
      url += "&consider_wikifier_columns_only=false"
    };

    if (this.state.time_search_option === "augment_with_time_only") {
      url += "&augment_with_time=false&consider_time=true"
    }
    else if (this.state.time_search_option === "augment_with_time_and_attribute") {
      url += "&augment_with_time=true&consider_time=false"
    }
    else if (this.state.time_search_option === "no_augment_on_time") {
      url += "&augment_with_time=false&consider_time=false"
    };

    // document.getElementById("searchMessage").innerHTML = json.message;
    document.getElementById("searchMessage").innerHTML = "Now Searching...";
    
    // TODO: try and cache the error if detected
    var keywordsArray = this.state.keywords.split( /,| / )
    const query = {
      keywords: keywordsArray,
      variables: null,//JSON.parse(this.state.variables)
    }
    // TODO: how to deal with variables?
    console.log("query is", query);
    console.log("URL is", url);
    // create FormData
    var formData = new FormData();

    this.setState(
      {
        loading: true,
        full_query: query,
      },

      () => {
        // append query
        formData.append("query_json", JSON.stringify(this.state.full_query));
        // append data
        if (supplied_data_mode === "chose_from_local") {
          formData.append(
            "data",
            document.getElementById("suppliedData").files[0]
          );
        }

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
          // TODO: let the user know if search failed
          .then(response => {
            if (!response.ok) {
              this.setState({
                "loading": false,

              })
            }
            return response.json();
          })
          .then(json => {
            this.setState({
                onSearching:false,
                showSearchMessage:true,
              });
            // console.log("response is:", json)
            // console.log("response body is:", json.body)
            // if we get code 400, it should be failed
            if (json.code === "400") {
              console.log("Search ERROR!!")
              document.getElementById("searchMessage").innerHTML = json.message;
              return;
            }
            // otherwise it should search success
            else {
              document.getElementById("searchMessage").innerHTML = "";
              if (supplied_data_mode === "d3mDatasetID") {
                json.suppliedData = this.state.datasetID;
              }

              else if (supplied_data_mode === "filepath") {
                json.suppliedData = this.state.filepath;
              }
              else if (supplied_data_mode === "chose_from_local") {
                json.suppliedData = 
                  document.getElementById("suppliedData").files[0];
              };

              this.setState({
                result_json: json,
                loading: false
              });
              console.log("success fetch");
            }
          }).catch(
            error => { 
              console.log('request failed', error); 
              if (error.toString() === "TypeError: Failed to fetch") {
                document.getElementById("searchMessage").innerHTML = " It seems the datamart backend is not working! Please check!";
              }
              else {
                document.getElementById("searchMessage").innerHTML = error;
              }
              this.setState({
                loading: false
              })
            });
      }
    );
  }

  componentWillMount() {}

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleValChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  keyPress(e){
    // bind enter to trigger the search button
      if(e.keyCode === 13){
         this.handleSubmit();
         // put the login here
      }
   }

  handleSubmit = () => {
    console.log("submit query");
    this.fetchData();
  };

  changeInputText = () => {
    var fileInput = document.getElementById("suppliedData");
    fileInput.addEventListener("change", function() {
      console.log("change");
      var str = fileInput.value;
      var i;
      if (str.lastIndexOf("\\")) {
        i = str.lastIndexOf("\\") + 1;
      } else if (str.lastIndexOf("/")) {
        i = str.lastIndexOf("/") + 1;
      }

      var name = str.slice(i, str.length);
      document.getElementById("fileName").innerHTML = name;
    });
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
        <Grid item xs={12} className={classes.input}>
          <FormControl>
            <FormGroup row className={classes.row}>
              <TextField
                multiline
                rowsMax="5"
                label="keywords"
                placeholder="Please input keywords here"
                id="keywords"
                className={classes.textField}
                value={this.state.keywords}
                margin="dense"
                variant="outlined"
                onChange={this.handleValChange("keywords")}
              />
              <MouseOverPopover 
                helpContent1 = "keywords that want the search results to match. Seprate by comma `,`"
                helpContent2 = "For example: `poverty, education, population`"
              />
            </FormGroup>

            <FormGroup row className={classes.row}>
              <TextField
                multiline
                rowsMax="10"
                label="variables"
                placeholder="Please input variables here"
                id="variables"
                className={classes.textField}
                value={this.state.variables}
                margin="dense"
                variant="outlined"
                onChange={this.handleValChange("variables")}
              />
              <MouseOverPopover 
                helpContent1 = "currently giving variables for ISI datamart is useless"
              />
            </FormGroup>

            <FormGroup row className={classes.row}>
              <TextField 
                style={{minWidth: 265}}
                label="Max Return Docs Number"
                placeholder="Default is 20"
                id="maxDocs"
                className={classes.textFieldNum}
                value={this.state.maxDocsNum}
                margin="dense"
                variant="outlined"
                onChange={this.handleValChange("maxDocsNum")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.runWikifier}
                    onChange={this.handleChange("runWikifier")}
                    value="runWikifier"
                  />
                }
                label="Identify entities"
              />
              <MouseOverPopover helpContent1="If chosen, the system will find possible columns that can be wikifiered to get corresponding Q nodes in wikidata and 
    then a new columns will be added. This Q node column can be used for further augment. If set to false, the search speed
     will be quicker."/>
            </FormGroup>
            <FormGroup row className={classes.row}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.considerWikifierColumnsOnly}
                    onChange={this.handleChange("considerWikifierColumnsOnly")}
                    value="considerWikifierColumnsOnly"
                  />
                }
                label="Augment using entities columns only"
              />
              <MouseOverPopover helpContent1="If chosen, the system will only consider the Q node columns found from wikifier as candidate join columns."/>
            </FormGroup>
            <FormGroup row className={classes.row}>
              <FormControl style={{minWidth: 200}} className={classes.formControl}>
                <InputLabel id="timeRelateColumns">Time Search Options</InputLabel>
                <Select
                  labelId="timeRelateColumns"
                  id="timeRelateColumns"
                  onChange={this._onChangeTimeOption.bind(this)}
                  defaultValue="augment_with_time_only"
                >
                  <MenuItem value="augment_with_time_only">
                    Augment with time or entities or strings 
                  </MenuItem>
                  <MenuItem value="augment_with_time_and_attribute">
                    Augment With time and entities/strings
                  </MenuItem>
                  <MenuItem value="no_augment_on_time">
                    Augment With entities/strings only
                  </MenuItem>
                </Select>
              </FormControl>
              <MouseOverPopover 
                helpContent1=" If chose `Augment with Time Only`, the system will match the time ONLY." 
                helpContent2=" This is different from `Augment with both time and attribute` which requires extra content column matches. If augment_with_time is set to true, this option will be useless. It would help when augmenting datasets like NY_TAXI dataset as there is only a time column. "
                helpContent3 = "If chose `augment_with_time_and_attribute`, the system will auto generate join pairs base on 2 columns like (time_column, content_column). "
                helpContent4 = "This will return candidate datasets with both time and the contents are matched. If the supplied data do not contains any time columns, the returned results will be empty. It would help when augmenting datasets like LL1_PHEM dataset."
                helpContent5 = "If chose `Do Not Consider Time`, any time columns will be ignored, only general content columns will be considered as candidate join columns."
              />
            </FormGroup>
            <FormGroup row className={classes.row}>

              <FormControl style={{minWidth: 200}} className={classes.formControl}>
                <InputLabel id="suppliedDataFormat">Supplied Data Format</InputLabel>
                <Select
                  labelId="suppliedDataFormat"
                  id="suppliedDataFormat"
                  onChange={this._onChange.bind(this)}
                >
                  <MenuItem value="chose_from_local">local file (pkl/zip/csv)</MenuItem>
                  <MenuItem value="d3mDatasetID">d3m dataset id</MenuItem>
                  <MenuItem value="filepath">filepath</MenuItem>
                  <MenuItem value="withoutData">without data</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>

            <FormGroup row className={classes.row}>
            <input
                className={classes.upload}
                id="suppliedData"
                ref={"file-upload"}
                type="file"
                onClick={this.changeInputText}
              />

              <div> {
                this.state.showUploadButton? 
                <div>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    onClick={e => {
                      this.refs["file-upload"].click();
                    }}
                  >
                    Supplied Data
                    <CloudUploadIcon className={classes.rightIcon} />
                  </Button>

                  <span id="fileName" className={classes.fileName}>
                    No File Chosen
                  </span>

                </div>:null
              }
              </div>

              <div> {
                this.state.shownInputDatasetTextBox? 
                <div>
                  <TextField 
                    // style={{minWidth: 265}}
                    label="D3M Dataset ID"
                    placeholder="DA_poverty_estimation"
                    defaultValue="DA_poverty_estimation"
                    id="datasetID"
                    className={classes.textField}
                    // value={this.state.datasetID}
                    margin="dense"
                    variant="outlined"
                    onKeyDown={this.keyPress}
                    onChange={this.handleValChange("datasetID")}
                  />
                </div>:null
              }
              </div>

              <div> {
                this.state.shownInputFilepathTextBox? 
                <div>
                  <TextField 
                    // style={{minWidth: 365}}
                    label="filepath"
                    placeholder="https://raw.githubusercontent.com/usc-isi-i2/datamart-upload/d3m/datamart_web/test_search_data.csv"
                    id="maxDocs"
                    className={classes.textField}
                    value={this.state.filepath}
                    margin="dense"
                    variant="outlined"
                    onChange={this.handleValChange("filepath")}
                  />
                </div>:null
              }
              </div>
            </FormGroup>

            <FormGroup row className={classes.row}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.handleSubmit}
                labelWidth="2000"
                disabled={this.state.onSearching}
              >
                Search
                <SearchIcon className={classes.rightIcon} />
              </Button>
            </FormGroup>

          </FormControl>
        </Grid>

        {this.state.loading ? (
          <Empty />
        ) : (
          <ResultList resultJson={this.state.result_json} />
        )}

        <FormGroup row className={classes.row}>
          <div> {
            <div>
              <span id="searchMessage" className={classes.searchMessage}>
                    
                  </span>
            </div>
          }
          </div>
        </FormGroup>

      </Grid>
    );
  }
}

export default withStyles(styles)(SearchPanel);
