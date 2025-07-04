import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaMosque,
  FaCross,
  FaYinYang,
  FaStarAndCrescent,
  FaOm,
  FaPeace,
} from "react-icons/fa";

const iconMap = {
  Islam: <FaMosque />,
  Kristen: <FaCross />,
  Katolik: <FaCross />,
  Hindu: <FaOm />,
  Buddha: <FaPeace />,
  Konghucu: <FaYinYang />,
  "Kepercayaan Lain": <FaStarAndCrescent />,
};

const prosesDataAgama = (dataArray) => {
  if (!Array.isArray(dataArray)) return [];
  const kategori = [
    { key: "islam", label: "Islam" },
    { key: "kristen", label: "Kristen" },
    { key: "katolik", label: "Katolik" },
    { key: "hindu", label: "Hindu" },
    { key: "budha", label: "Buddha" },
    { key: "konghucu", label: "Konghucu" },
    { key: "kepercayaan_lain", label: "Lainnya" },
  ];
  return kategori.map(({ key, label }) => {
    const jumlah = dataArray.reduce(
      (total, item) => total + (parseInt(item[key]) || 0),
      0
    );
    return { agama: label, jumlah };
  });
};

const AgamaCards = ({ tahun, kode_sls }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tahun) return;
    const fetchAgama = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/data-agama/tahun", {
          params: kode_sls ? { tahun, kode_sls } : { tahun },
        });
        const processed = prosesDataAgama(
          Array.isArray(response.data) ? response.data : []
        );
        // Filter data yang jumlahnya 0 agar tidak ditampilkan
        setData(processed.filter((item) => item.jumlah > 0));
      } catch (err) {
        console.error("Gagal memuat data agama:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgama();
  }, [tahun, kode_sls]);

  if (loading)
    return (
      <p className="text-center text-sm text-gray-500">Memuat data agama...</p>
    );

  if (data.length === 0)
    return <p className="text-center text-gray-500">Data tidak tersedia.</p>;

  return (
    // Grid dibuat lebih responsif dengan gap yang cukup
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {data.map((item) => (
        // Menghilangkan bg dan shadow dari kartu karena sudah ada di wrapper
        <div
          key={item.agama}
          className="border border-gray-200 p-4 rounded-xl text-center transition-transform duration-300 hover:bg-gray-50"
        >
          <div className="text-green-600 text-3xl mx-auto mb-2">
            {iconMap[item.agama] || <FaStarAndCrescent />}
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-800">
            {item.jumlah}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">{item.agama}</p>
        </div>
      ))}
    </div>
  );
};

export default AgamaCards;
