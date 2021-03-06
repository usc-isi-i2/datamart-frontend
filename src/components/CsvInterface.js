import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "react-table/react-table.css";
import ReactTable from "react-table";
// import { Document, Page } from 'react-pdf';
import PDFViewer from 'pdf-viewer-reactjs';
// import ImgsViewer from 'react-images-viewer';

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
  const fileType = inputData.inputData.fileType;
  console.log("File type is", fileType);

  if (fileType === "csv") {
    // use csv render
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
  // use pdf render
  else if (fileType === "pdf") {
    const pageNumber = 1;
    const numPages = null;
    const data = inputData.inputData.csvResult;
    // console.log(data);
    const loading = false;
    // return (
    //   <div>
    //     <Document
    //       file={data}
    //       // onLoadSuccess={this.onDocumentLoadSuccess}
    //     >
    //       <Page pageNumber={pageNumber} />
    //     </Document>
    //     <p>Page {pageNumber} of {numPages}</p>
    //   </div>
    // );
    return (
        <PDFViewer
            document={{
                base64: data,
            }}
        />
    )
  }
  // use pdf render
  else if (fileType === "image") {
    const data = inputData.inputData.csvResult;
    return (
        <img src={`data:image/jpeg;base64,${data}`} />
    )
  }

}



export default Interface;
