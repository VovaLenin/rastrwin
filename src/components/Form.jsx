import React, { useState, useEffect } from "react";
import Table from "./Table";
import DataGrid from "./DataGrid";
import PackedMatrix from "./PackedMatrix";
import createMatrixY from "../utils/createMatrixY";
import graphConnectivity from "../utils/graphConnectivity";
import invertMatrix from "../utils/invertMatrix";
import matrixPacking from "../utils/matrixPacking";
import Navbar from "./Navbar";
import unpacking from "../utils/unpacking";

const Form = () => {
  const valuesMatrix = {
    nodes: [
      ["1", "", "", "", "", "", "", "1", "1"],
      ["2", "", "", "", "", "", "", "1", "1"],
      ["3", "", "", "", "", "", "", "1", "1"],
      ["4", "", "", "", "", "", "", "1", "1"],
    ],
    branches: [["", "1", "2", "1", "1", "1"], ["", "2", "3", "1", "1", "1"],["", "3", "4", "1", "1", "1"]],
  };
  // const [valuesMatrix, setValuesMatrix] = useState(initialValues);
  const initialValues = 0;
  const setValuesMatrix = 0;
  const tableIDs = {
    nodes: "nodeTable",
    branches: "branchTable",
  };

  const handleSave = () => {
    const newMatrix = {};
    for (let key in tableIDs) {
      const oTable = document.querySelector(`#${tableIDs[key]}`);
      const rowLength = oTable.rows.length;
      newMatrix[key] = [];

      for (let i = 1; i < rowLength; i++) {
        const oCells = oTable.rows.item(i).cells;
        const cellLength = oCells.length;
        const rowArray = [];
        for (let j = 0; j < cellLength; j++) {
          rowArray.push(oCells.item(j).innerText);
        }
        newMatrix[key].push(rowArray);
      }
    }
    setValuesMatrix(newMatrix);
  };
  const handleClear = () => {
    for (let key in tableIDs) {
      const oTable = document.querySelector(`#${tableIDs[key]}`);
      const rowLength = oTable.rows.length;
      for (let i = 1; i < rowLength; i++) {
        const oCells = oTable.rows.item(i).cells;
        const cellLength = oCells.length;
        for (let j = 0; j < cellLength; j++) {
          oCells.item(j).innerText = "";
        }
      }
    }
    setValuesMatrix({});
  };
  const handleLoad = () => {
    setValuesMatrix(initialValues);
  };
  const isGraphConnectivity = graphConnectivity(valuesMatrix);
  const Y = createMatrixY(isGraphConnectivity, valuesMatrix);
  const invertY = invertMatrix(Y);
  const packedMatrix = matrixPacking(Y);
  console.log(packedMatrix);
  console.log(unpacking(packedMatrix, 1, 1));
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-start">
          <Table
            headers={[
              "№",
              "Название",
              "Тип",
              "U, кВ",
              "dU, гр",
              "P, Мвт",
              "Q, МВар",
              "Yd, мкСм",
              "Ym, мкСм",
            ]}
            title="Параметры узлов"
            id={tableIDs.nodes}
          />

          <Table
            headers={[
              "Название",
              "№ начала",
              "№ конца",
              "R, Ом",
              "X, Ом",
              "Кт",
            ]}
            title="Параметры ветвей"
            id={tableIDs.branches}
          />
        </div>

        <Navbar
          values={valuesMatrix}
          onClear={handleClear}
          onSave={handleSave}
          onLoad={handleLoad}
        />

        {isGraphConnectivity ? (
          <>
            <div className="matrix-container mt-2">
              <div className="">
                <DataGrid matrix={Y} title="Матрица проводимостей" />
              </div>
              <div className="">
                <DataGrid
                  matrix={invertY}
                  title="Обратная матрица проводимостей"
                />
              </div>
              <div className="">
                <PackedMatrix packedMatrix={packedMatrix} />
              </div>
            </div>
          </>
        ) : (
          <div>Граф сети не связан!</div>
        )}
      </div>
    </>
  );
};

export default Form;
