import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// Warna-warni untuk setiap bagian "slice" dari Donut Chart
const COLORS = ["#16a34a", "#f97316", "#3b82f6", "#facc15"];

// Komponen untuk menampilkan legenda kustom di samping chart
const CustomLegend = ({ payload }) => {
  return (
    <ul className="flex flex-col space-y-3">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center text-sm">
          <span
            className="w-3 h-3 rounded-full mr-3"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600 mr-2">{entry.value}:</span>
          <span className="font-semibold">{entry.payload.value} Jiwa</span>
        </li>
      ))}
    </ul>
  );
};

const DusunChart = ({ data }) => {
  // Jika tidak ada data, tampilkan pesan
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-gray-500">Data dusun tidak tersedia.</p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Tooltip formatter={(value, name) => [`${value} Jiwa`, name]} />
        <Pie
          data={data}
          cx="40%" // Geser pusat Pie ke kiri untuk memberi ruang pada legenda
          cy="50%"
          innerRadius={60} // Ini yang membuatnya menjadi Donut, bukan Pie
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value" // Kunci dari data yang akan dijadikan nilai
          nameKey="nama" // Kunci dari data yang akan dijadikan nama/label
          labelLine={false}
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`} // Tampilkan persentase di dalam slice
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/* Menggunakan legenda kustom kita */}
        <Legend
          content={<CustomLegend />}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DusunChart;
