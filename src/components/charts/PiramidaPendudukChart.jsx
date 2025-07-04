import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

// Urutan kelompok umur (tidak berubah)
const ageOrder = [
  "0-4 Tahun",
  "5-9 Tahun",
  "10-14 Tahun",
  "15-19 Tahun",
  "20-24 Tahun",
  "25-29 Tahun",
  "30-34 Tahun",
  "35-39 Tahun",
  "40-44 Tahun",
  "45-49 Tahun",
  "50-54 Tahun",
  "55-59 Tahun",
  "60+ Tahun",
];

// Fungsi-fungsi pemrosesan data (tidak berubah)
const getUmurLabel = (umur) => {
  umur = parseInt(umur);
  if (isNaN(umur)) return null;
  if (umur >= 60) return "60+ Tahun";
  const start = Math.floor(umur / 5) * 5;
  const end = start + 4;
  return `${start}-${end} Tahun`;
};
const getLakiLakiValue = (item) =>
  item.laki_laki ?? item.laki ?? item.jumlah_laki ?? 0;
const cleanNumber = (value) => {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};
const processDataForChart = (data) => {
  if (!data || !Array.isArray(data)) return [];
  const grouped = {};
  data.forEach((item) => {
    const umur = parseInt(item.umur);
    const groupLabel = getUmurLabel(umur);
    if (!groupLabel) return;
    const laki = cleanNumber(getLakiLakiValue(item));
    const perempuan = cleanNumber(item.perempuan);
    if (!grouped[groupLabel]) {
      grouped[groupLabel] = { laki: 0, perempuan: 0 };
    }
    grouped[groupLabel].laki += laki;
    grouped[groupLabel].perempuan += perempuan;
  });
  const result = Object.entries(grouped).map(([label, counts]) => ({
    umurLabel: label,
    laki: counts.laki,
    perempuan: counts.perempuan,
  }));
  return result.sort(
    (a, b) => ageOrder.indexOf(a.umurLabel) - ageOrder.indexOf(b.umurLabel)
  );
};

// Komponen Tooltip Kustom untuk menampilkan detail L/P
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg text-sm">
        <p className="font-bold text-gray-800 mb-2">{`${label}`}</p>
        {payload.map((pld) => (
          <p key={pld.dataKey} style={{ color: pld.fill }}>
            {`${pld.name}: ${pld.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Komponen utama chart
const PiramidaPendudukChart = ({ tahun }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tahun) return;
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/data-umur/tahun?tahun=${encodeURIComponent(tahun)}`
        );
        const processed = processDataForChart(response.data);
        setChartData(processed);
      } catch (error) {
        console.error("Gagal mengambil data umur:", error);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tahun]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-4">Memuat data...</p>;
  }
  if (!chartData.length) {
    return (
      <p className="text-center text-gray-500 mt-4">
        Tidak ada data untuk tahun <strong>{tahun}</strong>
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{
          top: 5,
          right: 20,
          left: 30, // Memberi ruang ekstra untuk label
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" tick={{ fontSize: 12 }} />
        <YAxis
          dataKey="umurLabel"
          type="category"
          width={90} // Lebar area label
          tick={{ fontSize: 11 }} // Ukuran font label dikecilkan
          interval={0} // Tampilkan semua label
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "rgba(240, 240, 240, 0.6)" }}
        />
        <Legend wrapperStyle={{ paddingTop: "10px" }} />
        <Bar dataKey="laki" name="Laki-laki" fill="#4ade80" barSize={12} />
        <Bar dataKey="perempuan" name="Perempuan" fill="#fb923c" barSize={12} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PiramidaPendudukChart;
