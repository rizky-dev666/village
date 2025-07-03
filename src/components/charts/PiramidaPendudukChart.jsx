import  { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import "./PiramidaPendudukChart.css";

// Urutan kelompok umur
const ageOrder = [
  "0-4 Tahun", "5-9 Tahun", "10-14 Tahun", "15-19 Tahun", "20-24 Tahun",
  "25-29 Tahun", "30-34 Tahun", "35-39 Tahun", "40-44 Tahun",
  "45-49 Tahun", "50-54 Tahun", "55-59 Tahun", "60+ Tahun"
];

// Fungsi untuk membuat label umur dari usia mentah
const getUmurLabel = (umur) => {
  umur = parseInt(umur);
  if (isNaN(umur)) return null;
  if (umur >= 60) return "60+ Tahun";
  const start = Math.floor(umur / 5) * 5;
  const end = start + 4;
  return `${start}-${end} Tahun`;
};

// Support nama properti laki-laki yang berbeda
const getLakiLakiValue = (item) => item.laki_laki ?? item.laki ?? item.jumlah_laki ?? 0;

// Bersihkan nilai numerik
const cleanNumber = (value) => {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};

// Kelompokkan data usia untuk chart
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

// Komponen utama chart
const PiramidaPendudukChart = ({ tahun }) => {
  const [chartData, setChartData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    if (!tahun) {
      setChartData([]);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/data-umur/tahun?tahun=${encodeURIComponent(tahun)}`
        );
        const processed = processDataForChart(response.data);
        setChartData(processed);

        const max = Math.max(
          ...processed.map((d) => Math.max(d.laki, d.perempuan))
        );
        setMaxValue(Math.ceil(max / 10) * 10);
      } catch (error) {
        console.error("Gagal mengambil data umur:", error);
        setChartData([]);
      }
    };

    fetchData();
  }, [tahun]);

  if (!tahun) return null;
  if (!chartData.length)
    return (
      <p className="text-center text-gray-500 mt-4">
        Tidak ada data untuk tahun <strong>{tahun}</strong>
      </p>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div style={{ display: "flex", width: "100%", height: 400 }}>
        {/* Laki-laki */}
        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 0, left: 100, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, maxValue]} reversed tick={{ fontSize: 12 }} />
              <YAxis dataKey="umurLabel" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="laki" name="Laki-laki" fill="#4ade80">
                <LabelList dataKey="laki" position="insideLeft" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Perempuan */}
        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 100, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, maxValue]} tick={{ fontSize: 12 }} />
              <YAxis dataKey="umurLabel" type="category" hide />
              <Tooltip />
              <Bar dataKey="perempuan" name="Perempuan" fill="#fb923c">
                <LabelList dataKey="perempuan" position="insideRight" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
          gap: 20,
          fontSize: 14,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 16, height: 16, backgroundColor: "#4ade80", borderRadius: 2 }}></div>
          <span>Laki-laki</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 16, height: 16, backgroundColor: "#fb923c", borderRadius: 2 }}></div>
          <span>Perempuan</span>
        </div>
      </div>
    </div>
  );
};

export default PiramidaPendudukChart;
