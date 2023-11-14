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
    <div className="col">
      <table className="table table-bordered table-sm w-auto">
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default PackedMatrix;
