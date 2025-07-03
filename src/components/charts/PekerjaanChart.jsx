import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import axios from "axios";

const PekerjaanChart = ({ tahun }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tahun) return;

    const fetchPekerjaan = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/data-pekerjaan/tahun", {
          params: { tahun },
        });

        const pekerjaanData = response.data?.[0]; // Ambil objek pertama
        if (pekerjaanData) {
          const transformedData = [
            { nama: "Pelajar", jumlah: pekerjaanData.pelajar },
            { nama: "Mengurus Rumah Tangga", jumlah: pekerjaanData.mengurus_rumah_tangga },
            { nama: "Tidak Bekerja", jumlah: pekerjaanData.tidak_bekerja },
            { nama: "Karyawan Swasta", jumlah: pekerjaanData.karyawan_swasta },
            { nama: "Petani", jumlah: pekerjaanData.petani },
            { nama: "Wiraswasta", jumlah: pekerjaanData.wiraswasta },
            { nama: "Perangkat Desa", jumlah: pekerjaanData.perangkat_desa },
            { nama: "PNS", jumlah: pekerjaanData.pns },
            { nama: "Lainnya", jumlah: pekerjaanData.lainnya },
          ];
          setData(transformedData);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("Gagal memuat data pekerjaan:", err);
        setError("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchPekerjaan();
  }, [tahun]);

  if (!tahun) return null;
  if (loading) return <p>Memuat data pekerjaan...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data || data.length === 0) return <p>Data pekerjaan tidak tersedia.</p>;

  const maxJumlah = Math.max(...data.map((item) => item.jumlah), 0);

  return (
    <div className="w-full h-auto overflow-y-auto overflow-x-hidden">
      <BarChart
        layout="vertical"
        width={600}
        height={data.length * 50}
        data={data}
        margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" domain={[0, maxJumlah + 100]} hide />
        <YAxis
          type="category"
          dataKey="nama"
          width={150}
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(240,240,240,0.5)" }}
          formatter={(value) => [`${value} Orang`, "Jumlah"]}
        />
        <Bar dataKey="jumlah" radius={[0, 4, 4, 0]} fill="#3b82f6">
          <LabelList
            dataKey="jumlah"
            position="right"
            style={{ fontSize: 12, fill: "#ffffff" }}
          />
        </Bar>
      </BarChart>
    </div>
  );
};

export default PekerjaanChart;
