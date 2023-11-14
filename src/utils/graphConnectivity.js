export default function graphConnectivity(values) {
  const numberU = values.nodes.length;
  const numberV = values.branches.length;

  const pointU = [];
  const NN = [];
  const NK = [];

  for (let i = 0; i < numberU; ++i) {
    pointU[i] = values.nodes[i][0];
  }
  console.log(pointU);
  for (let i = 0; i < numberV; ++i) {
    NN[i] = values.branches[i][1];
    NK[i] = values.branches[i][2];
  }
  const EN = NN[0];
  let PN = 0;
  for (let i = 0; i < numberV; ++i) {
    if (NN[i] === EN) {
      PN = NK[i];
    }
    if (NK[i] === EN) {
      PN = NN[i];
    }
    for (let j = 0; j < numberV; ++j) {
      if (NN[j] === PN) {
        NN[j] = EN;
      }
      if (NK[j] === PN) {
        NK[j] = EN;
      }
    }
    for (let j = 0; j < numberU; ++j) {
      if (pointU[j] === PN) {
        pointU[j] = EN;
      }
    }
  }
  let sign = true;

  for (let i = 0; i < numberV; ++i) {
    if (NN[i] !== EN) {
      sign = false;
    }
    if (NK[i] !== EN) {
      sign = false;
    }
  }

  return sign;
}
