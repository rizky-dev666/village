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

const prosesDataTernak = (dataArray) => {
  if (!Array.isArray(dataArray)) return [];

  const kategori = [
    { key: "sapi", label: "Sapi" },
    { key: "domba", label: "Domba" },
    { key: "ayam", label: "Ayam" },
    { key: "lainnya", label: "Lainnya" },
  ];

  return kategori.map(({ key, label }) => {
    const jumlah = dataArray.reduce(
      (total, item) => total + (parseInt(item[key]) || 0),
      0
    );
    return { ternak: label, jumlah };
  });
};

const TernakChart = ({ tahun, kode_sls }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tahun) return;

    const fetchTernak = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/data-ternak/tahun", {
          params: kode_sls ? { tahun, kode_sls } : { tahun },
        });

        const arrayData = Array.isArray(response.data) ? response.data : [];
        const processed = prosesDataTernak(arrayData);
        setData(processed);
      } catch (err) {
        console.error("Gagal memuat data ternak:", err);
        setError("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchTernak();
  }, [tahun, kode_sls]);

  if (!tahun) return null;
  if (loading) return <p>Memuat data ternak...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data.length) return <p>Data ternak tidak tersedia.</p>;

  const maxJumlah = Math.max(...data.map((item) => item.jumlah), 0);

  return (
    <ResponsiveContainer width="100%" height={data.length * 70}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 5, right: 35, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" domain={[0, maxJumlah + 10]} hide />
        <YAxis
          type="category"
          dataKey="ternak"
          width={100}
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(240, 240, 240, 0.5)" }}
          formatter={(value) => [`${value} Ekor`, "Jumlah"]}
        />
        <Bar dataKey="jumlah" radius={[0, 4, 4, 0]} fill="#f59e0b">
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

export default TernakChart;
