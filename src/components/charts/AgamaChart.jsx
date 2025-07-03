import React, { useEffect, useState } from "react";
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
import axios from "axios";

// Proses data dari array hasil Supabase
const prosesDataAgama = (dataArray) => {
  if (!Array.isArray(dataArray)) return [];

  const kategori = [
    { key: "islam", label: "Islam" },
    { key: "kristen", label: "Kristen" },
    { key: "katolik", label: "Katolik" },
    { key: "hindu", label: "Hindu" },
    { key: "budha", label: "Buddha" },
    { key: "konghucu", label: "Konghucu" },
    { key: "kepercayaan_lain", label: "Kepercayaan Lain" },
  ];

  return kategori.map(({ key, label }) => {
    const jumlah = dataArray.reduce(
      (total, item) => total + (parseInt(item[key]) || 0),
      0
    );
    return { agama: label, jumlah };
  });
};

const AgamaChart = ({ tahun, kode_sls }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tahun) return;

    const fetchAgama = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/data-agama/tahun", {
          params: kode_sls ? { tahun, kode_sls } : { tahun },
        });

        const arrayData = Array.isArray(response.data) ? response.data : [];
        const processed = prosesDataAgama(arrayData);
        setData(processed);
      } catch (err) {
        console.error("Gagal memuat data agama:", err);
        setError("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchAgama();
  }, [tahun, kode_sls]);

  if (!tahun) return null;
  if (loading) return <p>Memuat data agama...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data.length) return <p>Data agama tidak tersedia.</p>;

  const maxJumlah = Math.max(...data.map((item) => item.jumlah), 0);

  return (
    <ResponsiveContainer width="100%" height={data.length * 60}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 5, right: 35, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" domain={[0, maxJumlah + 20]} hide />
        <YAxis
          type="category"
          dataKey="agama"
          width={120}
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(240, 240, 240, 0.5)" }}
          formatter={(value) => [`${value} Orang`, "Jumlah"]}
        />
        <Bar dataKey="jumlah" fill="#6366f1" radius={[0, 4, 4, 0]}>
          <LabelList
            dataKey="jumlah"
            position="right"
            style={{ fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AgamaChart;
