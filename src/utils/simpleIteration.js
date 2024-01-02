const Complex = require("complex.js");

export default function simpleIterations() {
  const nodes = dataGridView1.RowCount;
  const U0 = new MatrixComplex(nodes, 1);
  const U1 = new MatrixComplex(nodes, 1);
  const S = new MatrixComplex(nodes, 1);
  for (let i = 0; i < nodes; i++) {
    // считываем напряжение
    const MU = Convert.ToDouble(dataGridView1[3][i].Value);
    const DU = Convert.ToDouble(dataGridView1[4][i].Value);
    const UP = new Complex(MU * Math.Cos(DU), MU * Math.Sin(DU));
    U0[i][0] = UP;
    // считываем мощности
    const P = Convert.ToDouble(dataGridView1[5][i].Value);
    const Q = Convert.ToDouble(dataGridView1[5][i].Value);
    S[i][0] = new Complex(P, Q);
  }

  const error = Convert.ToDouble(textBox4.Text);
  const iterlimit = Convert.ToInt16(textBox5.Text);

  // метод простых итераций

  const itercount = 0;

  while (itercount < iterlimit) {
    U1[0][0] = U0[0][0];
    for (let i = 1; i < nodes; i++) {
      const DDU = new Complex(0, 0);
      for (let j = 0; j < nodes; j++) {
        DDU = DDU + S[j][0] * Z[i][j] * U0[j][0].Inverse.Obr;
      }
      U1[i][0] = U0[0][0] - DDU;
    }

    const errs = new double[nodes](); // ARRAY
    for (let i = 1; i < nodes; i++) {
      errs[i] = Math.Abs((U0[i][0] - U1[i][0]).Abs);
    }

    let sign = true;

    for (let i = 1; i < nodes; i++) {
      if (errs[i] > error) {
        sign = false;
      }
    }

    if (sign) {
      dataGridView7.RowCount = nodes;
      dataGridView7.Columns.Add("1", "1");
      dataGridView7.Columns.Add("2", "2");
      for (let i = 0; i < nodes; i++) {
        dataGridView7[0][i].Value = U1[i][0].ToString();
        dataGridView7[1][i].Value = errs[i].ToString();
      }
      textBox5.Text = itercount.ToString();
      break;
    } else {
      for (let i = 0; i < nodes; i++) {
        U0[i][0] = U1[i][0];
      }
      itercount++;
    }
  }
}
