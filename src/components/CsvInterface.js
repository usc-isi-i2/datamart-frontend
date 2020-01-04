import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "react-table/react-table.css";
import ReactTable from "react-table";

function Interface(inputData) {
  // const [data, setData] = useState([]);
  // const [columns, setColumns] = useState([]);
  // const [loading, setLoading] = useState(true);

  const makeColumns = rawColumns => {
    return rawColumns.map(column => {
      return { Header: column, accessor: column };
    });
  };

  // console.log("Get input data as", inputData);//, inputData.inputData.csvResult);

  const file = Papa.parse(inputData.inputData.csvResult, 
    {
      delimiter: ",",
      header: true,
      skipEmptyLines: true,
      // dynamicTyping: true,
      beforeFirstChunk: function(chunk) {
                    var rows = chunk.split( /\r\n|\r|\n/ );
                    if (rows[0][0] == ",") 
                      {rows[0] = "-" + rows[0];}
                    // var headings = rows[0].toUpperCase();
                    // rows[0] = headings;
                    return rows.join("\r\n");
                },
  });
  const data = file.data;
  const columns = makeColumns(file.meta.fields);
  const loading = false;
  // useEffect(() => {
    // if (data.length && columns.length)
    // {
    //   console.log("get data!!!");
    //   console.log("data is", data);
    //   console.log("columns is", columns); 
    // }


  return (
    <div>
      {!loading && (
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={15}
          className="-striped -highlight"
        />
      )}
    </div>
  );
}

export default Interface;
