using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;

namespace Zadanie1_brig_MM
{
    public partial class Form1 : Form
    {
        MatrixComplex Y = new MatrixComplex(100, 100);
        MatrixComplex Z = new MatrixComplex(100, 100);
        public Form1()
        {
            InitializeComponent();
        }

        private void Button1_Click(object sender, EventArgs e)
        {
            dataGridView1.RowCount = dataGridView1.RowCount + 1;
        }

        private void Button2_Click(object sender, EventArgs e)
        {
            if (dataGridView1.RowCount > 0)
            {
                dataGridView1.RowCount = dataGridView1.RowCount - 1;
            }

            
        }

        private void Button6_Click(object sender, EventArgs e)
        {
            dataGridView2.RowCount++;
        }

        private void Button5_Click(object sender, EventArgs e)
        {
            if (dataGridView2.RowCount > 0)
            {
                dataGridView2.RowCount--;
            }
        }

        private void Button9_Click(object sender, EventArgs e)
        {
            dataGridView1.Rows.Clear();
            dataGridView2.Rows.Clear();
        }

        private void Button8_Click(object sender, EventArgs e)
        {
            // сохранение данных в файл
            // вызов диалога сохранение файла
            SaveFileDialog sv = new SaveFileDialog();
            if (sv.ShowDialog() == DialogResult.OK)
            {
                // присваеваем файловую переменную
                StreamWriter file = new StreamWriter(sv.FileName);
                try
                {
                    // сохраняем данные в файл
                    // Сохраняем узлы
                    file.Write("Узлы");
                    file.Write("\r\n");
                    List<int> columns = new List<int>();
                    foreach(DataGridViewColumn column in dataGridView1.Columns)
                    {
                        if(column.Visible)
                        {
                            columns.Add(column.Index);
                        }
                    }
                    int countRows = dataGridView1.RowCount;

                    for (int i=0; i< countRows; i++ )
                    {
                        for(int j=0; j< columns.Count; j++)
                        {
                            file.Write(dataGridView1[columns[j], i].Value + ";");
                        }
                        file.Write("\r\n");
                    }
                    // Сохраняем ветви 
                    file.Write("Ветви");
                    file.Write("\r\n");
                    columns.Clear();
                    foreach (DataGridViewColumn column in dataGridView2.Columns)
                    {
                        if (column.Visible)
                        {
                            columns.Add(column.Index);
                        }
                    }
                     countRows = dataGridView2.RowCount;

                    for (int i = 0; i < countRows; i++)
                    {
                        for (int j = 0; j < columns.Count; j++)
                        {
                            file.Write(dataGridView2[columns[j], i].Value + ";");
                        }
                        file.Write("\r\n");
                    }
                    file.Close();

                }
                // сообщаем об ошибке если не получилось записать файл
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message, "Ошибка доступа к файлу!");

                }

            }
        }

        private void Button7_Click(object sender, EventArgs e)
        {
            dataGridView1.Rows.Clear();
            dataGridView2.Rows.Clear();

            OpenFileDialog ov = new OpenFileDialog();
            if (ov.ShowDialog() == DialogResult.OK)
            {
                string[] data = File.ReadAllLines(ov.FileName);
                int positionU = 0;
                int positionV = 0;
                for (int i = 0; i < data.Length; i++)
                {
                    if(data[i] == "Узлы") { positionU = i; }
                    if (data[i] == "Ветви") { positionV = i; }
                }
                for (int i= positionU+1; i<positionV; ++i)
                {
                    dataGridView1.Rows.Add(data[i].Split(';'));

                }
                for(int i = positionV+1; i<data.Length; ++i)
                {
                    dataGridView2.Rows.Add(data[i].Split(';'));
                }

            }
        }

        private void Button3_Click(object sender, EventArgs e)
        {
            int numberU = dataGridView1.RowCount;
            int numberV = dataGridView2.RowCount;

            int[] pointU = new int[numberU];
            int[] NN = new int[numberV];
            int[] NK = new int[numberV];

            for (int i = 0; i < numberU; ++i)
            {
                pointU[i] = Convert.ToInt16(dataGridView1[0, i].Value.ToString());
            }
            for (int i = 0; i < numberV; ++i)
            {
                NN[i] = Convert.ToInt16(dataGridView2[1, i].Value.ToString());
                NK[i] = Convert.ToInt16(dataGridView2[2, i].Value.ToString());
            }
            int EN = NN[0];
            int PN = 0;
            for (int i = 0; i < numberV; ++i)
            {
                if (NN[i] == EN) { PN = NK[i]; }
                if (NK[i] == EN) { PN = NN[i]; }
                for (int j = 0; j < numberV; ++j)
                {
                    if (NN[j] == PN) { NN[j] = EN; }
                    if (NK[j] == PN) { NK[j] = EN; }
                }
                for (int j = 0; j < numberU; ++j)
                {
                    if (pointU[j] == PN) { pointU[j] = EN; }
                }
            }
            bool sign = true;

            for (int i = 0; i < numberV; ++i)
            {
                if (NN[i] != EN) { sign = false; }
                if (NK[i] != EN) { sign = false; }
            }
            if (sign)
            {
                button3.ForeColor = Color.Green;
                button4.Enabled = true;
                button10.Enabled = true;
                button11.Enabled = true;
            }
            else
            {
                button3.ForeColor = Color.Red;
                button4.Enabled = false;
                button10.Enabled = false;
                button11.Enabled = false;
            }
        }

        private void Button4_Click(object sender, EventArgs e)
        {
            int nodes = dataGridView1.RowCount;
          

            for (int i=0; i<nodes; i++)
            {
                for (int j=0; j<nodes; j++)
                {

                    Y[i, j] = new Complex(0, 0);
                }
            }
             // ввод проводистоей узлов
            for (int i=0; i<nodes; i++)
            {
                int numder = Convert.ToInt16(dataGridView1[0, i].Value.ToString());
                double Yd = Convert.ToDouble(dataGridView1[7, i].Value.ToString());
                double Ym = Convert.ToDouble(dataGridView1[8, i].Value.ToString());

                Complex Ynode = new Complex(Yd, Ym);
                Y[numder - 1, numder - 1] = Y[numder - 1, numder - 1] + Ynode;
            }

            // ввод проводистоей ветвей
            for (int i = 0; i < dataGridView2.RowCount; i++) 
            {
                int NN = Convert.ToInt16(dataGridView2[1, i].Value.ToString());
                int NK = Convert.ToInt16(dataGridView2[2, i].Value.ToString());
                double R = Convert.ToDouble(dataGridView2[3, i].Value.ToString());
                double X = Convert.ToDouble(dataGridView2[4, i].Value.ToString());
                double K = Convert.ToDouble(dataGridView2[5, i].Value.ToString());

                Complex Z = new Complex(R, X);
                Complex KT = new Complex(K, 0);

                Y[NN - 1, NN - 1] = Y[NN - 1, NN - 1] + Z.Obr;
                Y[NK - 1, NK - 1] = Y[NK - 1, NK - 1] + Z.Obr * KT * KT;

                Y[NN - 1, NK - 1] = Y[NN - 1, NK - 1] - Z.Obr * KT;
                Y[NK - 1, NN - 1] = Y[NK - 1, NN - 1] - Z.Obr * KT;

            }

            // вывод матрицы проводимостей в таблицу
            dataGridView3.Rows.Clear();
            dataGridView3.Columns.Clear();

            dataGridView3.RowCount = nodes;

            for (int i=0; i<nodes-1; i++)
            {
                dataGridView3.Columns.Add(i.ToString(), i.ToString());
            }

            for (int i = 0; i < nodes; i++)
            {
                for (int j = 0; j < nodes; j++)
                {
                    dataGridView3[j, i].Value = Y[i, j].ToString();
                }
            }

        }

        private void Button10_Click(object sender, EventArgs e)
        {
            int nodes = dataGridView1.RowCount;
            MatrixComplex YP = new MatrixComplex(100, 100);
            YP = Y;

            Complex none = new Complex(-1, 0);

            for (int k=0; k<nodes; k++)
            {
                for (int i=0; i<nodes; i++)
                {
                    for (int j = 0; j < nodes; j++)
                    {
                        if ((i==k)&(j==k))
                        {
                            Z[i, j] = YP[i, j].Obr;
                        }
                        if ((i != k) & (j == k))
                        {
                            Z[i, j] = none * YP[i, j] * YP[k, k].Obr;
                        }
                        if ((i == k) & (j != k))
                        {
                            Z[i, j] =  YP[i, j] * YP[k, k].Obr;
                        }
                        if ((i != k) & (j != k))
                        {
                            Z[i, j] =  YP[i, j] - YP[i, k] * YP[k, j] * YP[k, k].Obr;
                        }
                    }
                }
                YP = Z;
            }
            // вывод матрицы сопотивлений в таблицу
            dataGridView4.Rows.Clear();
            dataGridView4.Columns.Clear();

            dataGridView4.RowCount = nodes;

            for (int i = 0; i < nodes - 1; i++)
            {
                dataGridView4.Columns.Add(i.ToString(), i.ToString());
            }

            for (int i = 0; i < nodes; i++)
            {
                for (int j = 0; j < nodes; j++)
                {
                    dataGridView4[j, i].Value =Z[i, j].ToString();
                }
            }
        }

        private void Button11_Click(object sender, EventArgs e)
        {
            int nodes = dataGridView1.RowCount;
            string[] VE = new string[nodes * nodes];

            // 1 метод  nodes*nodes*2+(nodes+1)*2
            // 2,3 метод nodes*nodes
            // 4 метод nodes*nodes

            int[] A = new int[nodes * nodes];

            string zero = "0 + j0";
            int countVE = 0;


            for (int j = 0; j < nodes; j++)
            {
                for (int i = 0; i < nodes; i++)
                {
                    if (dataGridView3[i, j].Value.ToString() != zero)
                    {
                        VE[countVE] = dataGridView3[i, j].Value.ToString();
                        A[countVE] = (i + 1) + ((j + 1) - 1) * nodes;
                        countVE++;
                    }
                }
            }

            dataGridView5.Rows.Clear();
            dataGridView5.Columns.Clear();
            dataGridView6.Rows.Clear();
            dataGridView6.Columns.Clear();


            dataGridView5.RowCount = 2;
            dataGridView6.RowCount = 1;
            for (int i=0; i< countVE-1; i++)
            {
                dataGridView5.Columns.Add(i.ToString(), i.ToString());
                dataGridView6.Columns.Add(i.ToString(), i.ToString());
            }

            for (int i=0; i< countVE; i++)
            {
                dataGridView5[i, 0].Value = VE[i];
                dataGridView6[i, 0].Value = A[i].ToString();
            }
            
        }

        private void Button12_Click(object sender, EventArgs e)
        {
            int IndeI = Convert.ToInt16(textBox3.Text);
            int IndeJ = Convert.ToInt16(textBox1.Text);

            int A = IndeI + (IndeJ - 1) * dataGridView1.RowCount;
            bool sign = true;
            for (int i = 0; i <dataGridView6.ColumnCount; i++)
            {
               if (dataGridView6[i,0].Value.ToString() == A.ToString())
                {
                    textBox2.Text = dataGridView5[i, 0].Value.ToString();
                    sign = false;

                }
            }
            if (sign) { textBox2.Text = " 0 + j0 "; }
        }

        private void Label4_Click(object sender, EventArgs e)
        {

        }

        private void Button13_Click(object sender, EventArgs e)
        {
            int nodes = dataGridView1.RowCount;
            MatrixComplex U0 = new MatrixComplex(nodes, 1);
            MatrixComplex U1 = new MatrixComplex(nodes, 1);
            MatrixComplex S = new MatrixComplex(nodes, 1);
            for (int i=0; i< nodes; i++)
            {
                // считываем напряжение
                double MU = Convert.ToDouble(dataGridView1[3, i].Value);
                double DU = Convert.ToDouble(dataGridView1[4, i].Value);
                Complex UP = new Complex(MU * Math.Cos(DU), MU * Math.Sin(DU));
                U0[i, 0] = UP;
                // считываем мощности
                double P = Convert.ToDouble(dataGridView1[5, i].Value);
                double Q = Convert.ToDouble(dataGridView1[5, i].Value);
                S[i, 0] = new Complex (P, Q);

            }

            double error = Convert.ToDouble(textBox4.Text);
            int iterlimit = Convert.ToInt16(textBox5.Text);

            // метод простых итераций

            int itercount = 0;

            while (itercount < iterlimit)
            {
                U1[0, 0] = U0[0, 0];
                for (int i = 1; i < nodes; i++)
                {

                  Complex DDU = new Complex(0, 0);
                    for (int j = 0; j < nodes; j++)
                    {
                        DDU = DDU + S[j, 0] * Z[i, j] * U0[j, 0].Inverse.Obr;
                    }
                    U1[i, 0] = U0[0, 0] - DDU;

                }

                double[] errs = new double[nodes];
                for (int i=1; i<nodes; i++)
                {
                    errs[i] = Math.Abs((U0[i, 0] - U1[i, 0]).Abs);
                }

                bool sign = true;

                for (int i = 1; i < nodes; i++)
                {
                   if (errs[i] > error) { sign = false; }
                }

                if (sign)
                {
                    dataGridView7.RowCount = nodes;
                    dataGridView7.Columns.Add("1", "1");
                    dataGridView7.Columns.Add("2", "2");
                    for (int i=0;i<nodes; i++)
                    {
                        dataGridView7[0, i].Value = U1[i, 0].ToString();
                        dataGridView7[1, i].Value = errs[i].ToString();
                    }

                    textBox5.Text = itercount.ToString();
                    break;
                }
                else
                {
                    for (int i = 0; i < nodes; i++)
                    {
                        U0[i, 0] = U1[i, 0];
                    }
                    itercount++;
                };
                
            }
        }
    }
}
