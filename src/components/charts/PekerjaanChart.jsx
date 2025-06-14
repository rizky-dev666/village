import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const PekerjaanChart = ({ data }) => {
  if (!data) return null; // Jika tidak ada data, jangan render apa-apa

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical" // Mengatur grafik menjadi horizontal
        data={data}
        margin={{ top: 5, right: 35, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="nama" // Label di samping diambil dari kunci 'nama'
          width={120}
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(240, 240, 240, 0.5)" }}
          formatter={(value) => [`${value} Orang`, "Jumlah"]}
        />
        <Bar dataKey="jumlah" radius={[0, 4, 4, 0]} fill="#f97316">
          <LabelList
            dataKey="jumlah"
            position="right"
            style={{ fontSize: 12, fill: "#4b5563" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PekerjaanChart;
