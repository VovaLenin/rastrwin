import React, { useState } from "react";
import Row from "./Row";

const Table = ({ headers, title, id }) => {
  const [rowCounter, setRowCounter] = useState(0);
  const renderRows = () => {
    if (rowCounter >= 0) {
      return [...Array(rowCounter)].map((item, index) => (
        <Row key={index} className={`input`} stringLength={headers.length} />
      ));
    }
  };
  const renderHeaders = () =>
    headers.map((header, index) => <th key={index}>{header}</th>);
  const handlerDelete = () => {
    if (rowCounter > 0) {
      setRowCounter(rowCounter - 1);
    }
  };
  const isHidden = () => (rowCounter === 0 ? "hidden" : "");
  return (
    <>
      <div className="col сol-6 m-0 p-0">
        <div className="d-flex justify-content-center">
          <h4 className="text-center">{title}</h4>
          <div className="btn-group m-2" role="group">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setRowCounter(rowCounter + 1)}
            >
              +
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={handlerDelete}
              hidden={isHidden()}
            >
              -
            </button>
          </div>
        </div>
        <table
          className="table table-bordered table-sm w-100"
          hidden={isHidden()}
          id={id}
        >
          <thead>
            <tr className="table-dark p-2">{renderHeaders()}</tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </div>
    </>
  );
};
export default Table;
