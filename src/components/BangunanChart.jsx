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

const prosesDataBangunan = (dataArray) => {
  if (!Array.isArray(dataArray)) return [];

  const kategori = [
    { key: "milik_sendiri", label: "Milik Sendiri" },
    { key: "sewa", label: "Sewa" },
    { key: "bebas_sewa", label: "Bebas Sewa" },
    { key: "dinas", label: "Dinas" },
    { key: "lainnya", label: "Lainnya" },
  ];

  return kategori.map(({ key, label }) => {
    const jumlah = dataArray.reduce(
      (total, item) => total + (parseInt(item[key]) || 0),
      0
    );
    return { kepemilikan: label, jumlah };
  });
};

const BangunanChart = ({ tahun, kode_sls }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tahun) return;

    const fetchBangunan = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/data-bangunan/tahun", {
          params: kode_sls ? { tahun, kode_sls } : { tahun },
        });

        const arrayData = Array.isArray(response.data) ? response.data : [];
        const processed = prosesDataBangunan(arrayData);
        setData(processed);
      } catch (err) {
        console.error("Gagal memuat data bangunan:", err);
        setError("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchBangunan();
  }, [tahun, kode_sls]);

  if (!tahun) return null;
  if (loading) return <p>Memuat data kepemilikan bangunan...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data.length) return <p>Data kepemilikan bangunan tidak tersedia.</p>;

  const maxJumlah = Math.max(...data.map((item) => item.jumlah), 0);

  return (
    <ResponsiveContainer width="100%" height={data.length * 65}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 5, right: 35, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" domain={[0, maxJumlah + 5]} hide />
        <YAxis
          type="category"
          dataKey="kepemilikan"
          width={140}
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(value) => [`${value} Unit`, "Jumlah"]}
          cursor={{ fill: "rgba(240,240,240,0.5)" }}
        />
        <Bar dataKey="jumlah" radius={[0, 4, 4, 0]} fill="#10b981">
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

export default BangunanChart;
