import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Data pendidikan dari statistikData.js berbentuk objek,
// jadi kita perlu mengubahnya menjadi array agar bisa dibaca oleh Recharts.
const prosesDataPendidikan = (data) => {
  if (!data) return [];
  return Object.entries(data).map(([key, value]) => ({
    // Mengambil kata pertama dari nama (e.g., "SD Sederajat" -> "SD")
    nama: key.split(" ")[0],
    jumlah: value,
  }));
};

const PendidikanChart = ({ data }) => {
  const chartData = prosesDataPendidikan(data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nama" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip formatter={(value) => [`${value} Orang`, "Jumlah"]} />
        <Bar dataKey="jumlah" fill="#3b82f6" name="Jumlah" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PendidikanChart;
