import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#303f9f",
    // #303f9f
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    BorderTop: "2em"
  },

  root: {
    flexGrow: 1,
    width: "100%"
  },

  input: {
    margin: "1em",
    height: "100%"
  },

  paper: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },

  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

let id = 0;
function createData(city, country) {
  id += 1;
  return { id, city, country };
}

const headers = ["city", "country"];

const rows = [
  createData("Los angeles", "United States"),
  createData("New york", "United States"),
  createData("Shanghai", "China"),
  createData("SAFDA", "fwfb"),
  createData("manchester", "United Kingdom")
];

function MaterializeResult(props) {
  const { classes } = props;

  return (
    <Grid
      container
      className={classes.root}
      alignItems="stretch"
      direction="column"
      justify="flex-start"
    >
      <Grid item xs={12} className={classes.input}>
        <Typography
          variant="headline"
          component="h3"
          align="center"
          color="primary"
        >
          CSV Preview
        </Typography>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.row}>
                {headers.map(header => {
                  return (
                    <CustomTableCell>
                      <h2>{header}</h2>
                    </CustomTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow className={classes.row} key={row.id}>
                    <CustomTableCell component="th" scope="row">
                      {row.city}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.country}
                    </CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}

MaterializeResult.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MaterializeResult);
