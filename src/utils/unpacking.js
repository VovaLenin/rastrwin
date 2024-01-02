export default function unpacking(packedMatrix, i, j) {
  let indeI = i;
  let indeJ = j;
  let indEnd = 0;
  let indBegin = 0;

  if (indeI <= indeJ) {
    const pr = indeI;
    indeI = indeJ;
    indeJ = pr;
  }

  indBegin = packedMatrix?.DI[indeI - 1]; // DI или VE

  if (indeI >= 2) {
    indEnd = packedMatrix?.DI[indeI - 2];
  } else {
    indEnd = indBegin;
  }
  let result = 0;
  let sign = true;
  for (let i = indBegin - 1; i > indEnd - 1; i = i - 1) {
    if (i + 1 == indeI) {
      result = packedMatrix?.VE[i + 1];
      sign = false;
    }
  }
  return result;
}
