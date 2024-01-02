import React from "react";

const Navbar = ({ values, onClear, onSave, onLoad }) => {
  if (
    Object.keys(values).includes("nodes") &&
    Object.keys(values).includes("branches")
  ) {
    return (
      <>
        <div className="row justify-content-center">
          <div className="btn-group form-row  col-3 ">
            <button className="btn btn-primary btn-sm" onClick={onSave}>
              Сохранить
            </button>
            <button className="btn btn-primary btn-sm" onClick={onClear}>
              Очистить
            </button>
            <button className="btn btn-primary btn-sm" onClick={onLoad}>
              Загрузить
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="row justify-content-center">
          <div className="btn-group form-row  col-3 ">
            <button className="btn btn-primary btn-sm" onClick={onLoad}>
              Загрузить
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default Navbar;
