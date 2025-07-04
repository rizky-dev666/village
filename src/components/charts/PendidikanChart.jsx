import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const kategori = [
  { key: "belum_sekolah", label: "Belum Sekolah" },
  { key: "masih_sekolah", label: "Masih Sekolah" },
  { key: "tidak_bersekolah_lagi", label: "Tidak Sekolah" },
  { key: "sd", label: "SD" },
  { key: "mi", label: "MI" },
  { key: "paket_a", label: "Paket A" },
  { key: "sdlb", label: "SDLB" },
  { key: "smp", label: "SMP" },
  { key: "mts", label: "MTs" },
  { key: "paket_b", label: "Paket B" },
  { key: "sma", label: "SMA" },
  { key: "smk", label: "SMK" },
  { key: "ma", label: "MA" },
  { key: "paket_c", label: "Paket C" },
  { key: "diploma", label: "Diploma" },
  { key: "s1", label: "S1" },
  { key: "s2", label: "S2" },
  { key: "s3", label: "S3" },
];

const prosesDataGabungan = (dataArray) => {
  if (!Array.isArray(dataArray)) return [];
  return kategori.map(({ key, label }) => {
    const jumlah = dataArray.reduce(
      (total, item) => total + (parseInt(item[key]) || 0),
      0
    );
    return { nama: label, jumlah };
  });
};

const CustomBar = ({ x, y, width, height, fill }) => {
  if (!height) return null;
  const minH = 2;
  const adjustedHeight = height < minH ? minH : height;
  const adjustedY = height < minH ? y - (minH - height) : y;
  return (
    <rect
      x={x}
      y={adjustedY}
      width={width}
      height={adjustedHeight}
      fill={fill}
    />
  );
};

const PendidikanChart = ({ tahun, sls }) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!tahun) return;
    const fetchData = async () => {
      setStatus("loading");
      try {
        const res = await axios.get("/api/data-pendidikan/tahun", {
          params: { tahun, ...(sls && { sls }) },
        });
        const hasil = res.data;
        if (!hasil || hasil.length === 0) {
          setStatus("nodata");
          return;
        }
        const processed = prosesDataGabungan(hasil);
        setData(processed);
        setStatus("success");
      } catch (err) {
        console.error("Gagal ambil data pendidikan:", err);
        setStatus("error");
      }
    };
    fetchData();
  }, [tahun, sls]);

  if (status === "loading")
    return <p className="text-center text-sm">Memuat data...</p>;
  if (status === "error")
    return <p className="text-center text-red-500">Gagal memuat data.</p>;
  if (status === "nodata")
    return <p className="text-center text-gray-500">Data tidak tersedia.</p>;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 20, left: -10, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* Mengubah tick menjadi miring */}
        <XAxis
          dataKey="nama"
          interval={0}
          angle={-45}
          textAnchor="end"
          height={70}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip formatter={(value) => [`${value} Orang`, "Jumlah"]} />
        <Bar
          dataKey="jumlah"
          fill="#3b82f6"
          name="Jumlah"
          shape={<CustomBar />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PendidikanChart;
