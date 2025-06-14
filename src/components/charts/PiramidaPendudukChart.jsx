import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

// Mengubah format data agar sesuai dengan kebutuhan Recharts
const processDataForChart = (data) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item) => ({
    ...item,
    // Recharts memerlukan nilai negatif untuk membuat bar ke arah kiri
    laki: -Math.abs(item.laki),
  }));
};

const PiramidaPendudukChart = ({ data }) => {
  const chartData = processDataForChart(data);

  // Cari nilai absolut maksimum untuk domain sumbu X
  const maxAbsValue = Math.max(
    ...chartData.flatMap((d) => [Math.abs(d.laki), d.perempuan])
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          domain={[-maxAbsValue, maxAbsValue]}
          // Format tick agar tidak menampilkan nilai negatif
          tickFormatter={(tick) => Math.abs(tick)}
        />
        <YAxis
          type="category"
          dataKey="umur"
          width={80}
          tick={{ fontSize: 12 }}
        />
        <Tooltip formatter={(value) => Math.abs(value)} />
        <Legend />
        <Bar dataKey="laki" name="Laki-laki" fill="#4ade80">
          <LabelList
            dataKey="laki"
            position="insideLeft"
            formatter={(value) => Math.abs(value)}
          />
        </Bar>
        <Bar dataKey="perempuan" name="Perempuan" fill="#fb923c">
          <LabelList dataKey="perempuan" position="insideRight" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PiramidaPendudukChart;
