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

const AgamaChart = ({ data }) => {
  if (!data) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 5, right: 35, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="nama" // Label diambil dari kunci 'nama'
          width={80}
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(240, 240, 240, 0.5)" }}
          formatter={(value) => [`${value} Orang`, "Jumlah"]}
        />
        {/* Memberi warna ungu untuk pembeda */}
        <Bar dataKey="jumlah" radius={[0, 4, 4, 0]} fill="#8b5cf6">
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

export default AgamaChart;
