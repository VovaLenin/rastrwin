import React from "react";

const DataGrid = ({ matrix, title }) => {
  const nodes = matrix.length;
  // Создаем массив для хранения строк таблицы
  const rows = [];

  // Создаем строки таблицы
  for (let i = 0; i < nodes; i++) {
    const cells = [];

    // Создаем ячейки таблицы
    for (let j = 0; j < nodes; j++) {
      cells.push(<td key={j}>{matrix[i][j].toString()}</td>);
    }

    // Добавляем строку с ячейками в массив строк
    rows.push(<tr key={i}>{cells}</tr>);
  }

  // Возвращаем таблицу
  return (
    <>
      <h5 className="text-center mb-2">{title}</h5>
      <table className="table table-bordered table-sm w-auto m-auto">
        <tbody>{rows}</tbody>
      </table>
    </>
  );
};

export default DataGrid;
