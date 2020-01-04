import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "react-table/react-table.css";
import ReactTable from "react-table";

function Interface(inputData) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDataChange = file => {
    setData(file.data);
    setColumns(makeColumns(file.meta.fields));
  };

  Papa.parse(inputData, {
    header: true,
    dynamicTyping: true,
    complete: handleDataChange
  });

  useEffect(() => {
    if (data.length && columns.length) setLoading(false);
  }, [data, columns]);

  const makeColumns = rawColumns => {
    return rawColumns.map(column => {
      return { Header: column, accessor: column };
    });
  };

  return (
    <div>
      {!loading && (
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      )}
    </div>
  );
}

export default Interface;
