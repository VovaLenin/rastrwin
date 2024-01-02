import roundValues from "./roundValues";
const Complex = require("complex.js");

function createMatrixY(isConnectivity, values) {
  if (isConnectivity) {
    const nodes = values.nodes.length;
    const Y = [];

    // ЗАДАЕМ НУЛЕВУЮ МАТРИЦУ
    for (let i = 0; i < nodes; i++) {
      Y[i] = [];
      for (let j = 0; j < nodes; j++) {
        Y[i][j] = new Complex(0, 0);
      }
    }

    // ВВОД ПРОВОДИМОСТЕЙ УЗЛОВ
    for (let i = 0; i < nodes; i++) {
      const numder = Number(values.nodes[i][0]);
      const Yd = Number(values.nodes[i][7]);
      const Ym = Number(values.nodes[i][8]);
      Y[numder - 1][numder - 1] = Y[numder - 1][numder - 1].add(
        new Complex(Yd, Ym)
      );
    }
    console.log(Y);
    //   ВВОД ПРОВОДИМОСТЕЙ ВЕТВЕЙ
    for (let i = 0; i < values.branches.length; i++) {
      const NN = Number(values.branches[i][1]);
      const NK = Number(values.branches[i][2]);
      const R = Number(values.branches[i][3]);
      const X = Number(values.branches[i][4]);
      const K = Number(values.branches[i][5]);
      const Z = new Complex(R, X);
      const KT = new Complex(K, 0);
      Y[NN - 1][NN - 1] = Y[NN - 1][NN - 1].add(Z.inverse());
      Y[NK - 1][NK - 1] = Y[NK - 1][NK - 1].add(Z.inverse().mul(KT.mul(KT)));
      Y[NN - 1][NK - 1] = Y[NN - 1][NK - 1].sub(Z.inverse().mul(KT));
      Y[NK - 1][NN - 1] = Y[NK - 1][NN - 1].sub(Z.inverse().mul(KT));
    }
    const Y1 = roundValues(Y, 3);
    console.log(Y1);
    return Y1;
  } else return null;
}

export default createMatrixY;
