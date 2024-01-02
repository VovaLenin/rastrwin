import roundValues from "./roundValues";
const Complex = require("complex.js");

export default function invertMatrix(matrix) {
  const nodes = matrix.length;
  let YP = [...matrix];
  const Z = [];
  const none = new Complex(-1);

  for (let k = 0; k < nodes; k++) {
    for (let i = 0; i < nodes; i++) {
      Z[i] = [];
      for (let j = 0; j < nodes; j++) {
        if (i === k && j === k) {
          Z[i][j] = YP[i][j].inverse();
        }
        if (i !== k && j === k) {
          Z[i][j] = none.mul(YP[i][j].mul(YP[k][k].inverse())); // none * YP[i, j] * YP[k, k].Obr
        }
        if (i === k && j !== k) {
          Z[i][j] = YP[i][j].mul(YP[k][k].inverse()); // YP[i, j] * YP[k, k].Obr
        }
        if (i !== k && j !== k) {
          Z[i][j] = YP[i][j].sub(
            YP[i][k].mul(YP[k][j].mul(YP[k][k].inverse())) // YP[i, j] - YP[i, k] * YP[k, j] * YP[k, k].Obr
          );
        }
      }
    }
    YP = [...Z];
  }
  const Z1 = roundValues(Z, 3);
  return Z1;
}
