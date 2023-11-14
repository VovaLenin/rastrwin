import React from "react";
const Row = ({ stringLength, className }) => {
  const renderTd = () =>
    [...Array(stringLength)].map((item, index) => (
      <td className={className} key={index} contentEditable="true">
        {/* <input type="text" className="form-control" /> */}
      </td>
    ));

  return (
    <>
      <tr>{renderTd()}</tr>
    </>
  );
};
export default Row;
