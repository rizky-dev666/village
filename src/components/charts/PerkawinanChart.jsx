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

const prosesDataPerkawinan = (dataArray) => {
  if (!Array.isArray(dataArray)) return [];

  const kategori = [
    { key: "belum_kawin", label: "Belum Kawin" },
    { key: "kawin", label: "Kawin" },
    { key: "cerai_hidup", label: "Cerai Hidup" },
    { key: "cerai_mati", label: "Cerai Mati" },
  ];

  return kategori.map(({ key, label }) => {
    const jumlah = dataArray.reduce(
      (total, item) => total + (parseInt(item[key]) || 0),
      0
    );
    return { status: label, jumlah };
  });
};

const PerkawinanChart = ({ tahun, kode_sls }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tahun) return;

    const fetchPerkawinan = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/data-perkawinan/tahun", {
          params: kode_sls ? { tahun, kode_sls } : { tahun },
        });

        const arrayData = Array.isArray(response.data) ? response.data : [];
        const processed = prosesDataPerkawinan(arrayData);
        setData(processed);
      } catch (err) {
        console.error("Gagal memuat data perkawinan:", err);
        setError("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchPerkawinan();
  }, [tahun, kode_sls]);

  if (!tahun) return null;
  if (loading) return <p>Memuat data perkawinan...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data.length) return <p>Data perkawinan tidak tersedia.</p>;

  const maxJumlah = Math.max(...data.map((item) => item.jumlah), 0);

  return (
    <ResponsiveContainer width="100%" height={data.length * 75}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 5, right: 35, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" domain={[0, maxJumlah + 20]} hide />
        <YAxis
          type="category"
          dataKey="status"
          width={100}
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(240, 240, 240, 0.5)" }}
          formatter={(value) => [`${value} Orang`, "Jumlah"]}
        />
        <Bar dataKey="jumlah" radius={[0, 4, 4, 0]} fill="#22c55e">
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

export default PerkawinanChart;
