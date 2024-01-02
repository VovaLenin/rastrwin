import React from "react";

const PackedMatrix = ({ packedMatrix }) => {
  console.log(packedMatrix);
  const rows = [];

  Object.entries(packedMatrix).forEach(([key, value], i) => {
    const cells = [];
    value.forEach((element, j) => {
      cells.push(<td key={j}>{element}</td>);
    });
    rows.push(<tr key={i}>{cells}</tr>);
  });
  return (
    <>
      <h5 className="text-center">Упакованная матрица</h5>
      <table className="table table-bordered table-sm w-auto m-auto mt-2">
        <tbody>{rows}</tbody>
      </table>
    </>
  );
};

export default PackedMatrix;
