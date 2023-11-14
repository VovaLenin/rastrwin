export default function matrixPacking(matrix) {
  const nodes = matrix.length;
  const VE = [];

  const DI = [];
  const zero = "0";

  let countVE = 0;
  let countDI = 0;

  for (let i = 0; i < nodes; i++) {
    for (let j = 0; j < nodes; j++) {
      if (matrix[i][j].toString() !== zero && j <= i) {
        for (let k = j; k <= i; k++) {
          VE[countVE] = matrix[i][k].toString();
          countVE++;
        }
        DI[countDI] = countVE;
        countDI++;
        break;
      }
    }
  }

  const packedMatrix = {
    VE,
    DI,
  };

  console.log(packedMatrix);

  return packedMatrix;
}
