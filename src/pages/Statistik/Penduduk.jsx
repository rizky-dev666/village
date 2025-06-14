import React, { useState, useCallback } from "react";
import PetaDesa from "../../components/PetaDesa";
import statistikData from "../../components/data/statistikData.js";
// 1. PERBAIKAN: Impor semua ikon yang kita butuhkan
import {
  FaUsers,
  FaHome,
  FaMale,
  FaFemale,
  FaMosque,
  FaCross,
  FaYinYang,
} from "react-icons/fa";

// Impor semua komponen grafik (AgamaChart tidak akan dipakai lagi di sini)
import PiramidaPendudukChart from "../../components/charts/PiramidaPendudukChart";
import DusunChart from "../../components/charts/DusunChart";
import PendidikanChart from "../../components/charts/PendidikanChart";
import PekerjaanChart from "../../components/charts/PekerjaanChart";
import PerkawinanChart from "../../components/charts/PerkawinanChart";
// import AgamaChart from "../../components/charts/AgamaChart"; // Tidak perlu lagi

// 2. PERBAIKAN: Menggunakan definisi Card dengan gaya terbaru
const Card = ({ title, value, icon }) => (
  <div className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
    <div className="flex items-center gap-3">
      <div className="bg-green-100 text-green-700 text-xl p-2.5 rounded-full">
        {icon}
      </div>
      <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
    </div>
    <p className="text-3xl font-bold text-green-800 mt-3">{value}</p>
  </div>
);

const SectionTitle = ({ children, className }) => (
  <h2 className={`text-xl font-bold text-green-700 mb-2 ${className}`}>
    {children}
  </h2>
);

const Penduduk = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("2025 - Semester 1");
  const [selectedRW, setSelectedRW] = useState("RW 1");

  const data = statistikData[selectedPeriod]?.[selectedRW] || {};

  const handleRWSelect = useCallback((rwNama) => {
    setSelectedRW(rwNama);
  }, []);

  return (
    <div className="mt-4 space-y-8">
      {/* Peta dan Kontrol */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h2 className="text-xl font-bold text-green-700">
            Peta Sebaran & Statistik Penduduk
          </h2>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 shadow-sm"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            {Object.keys(statistikData).map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </div>
        <div className="relative w-full h-[55vh] bg-gray-100 rounded-2xl shadow-lg overflow-hidden border-2 border-green-600 z-0">
          <PetaDesa setSelectedRW={handleRWSelect} />
        </div>
        <p className="mt-2 text-sm text-gray-700">
          RW terpilih: <span className="font-semibold">{selectedRW}</span>. Klik
          penanda di peta untuk mengubah data statistik.
        </p>
      </div>

      {/* Kartu Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Jumlah Penduduk"
          value={`${data.totalPenduduk || 0} Jiwa`}
          icon={<FaUsers />}
        />
        <Card
          title="Jumlah Kepala Keluarga"
          value={`${data.kepalaKeluarga || 0} KK`}
          icon={<FaHome />}
        />
        <Card
          title="Jumlah Laki-Laki"
          value={`${data.lakiLaki || 0} Jiwa`}
          icon={<FaMale />}
        />
        <Card
          title="Jumlah Perempuan"
          value={`${data.perempuan || 0} Jiwa`}
          icon={<FaFemale />}
        />
      </div>

      {/* Grafik Kelompok Umur */}
      <div>
        <SectionTitle className="text-green-700">
          Berdasarkan Kelompok Umur
        </SectionTitle>
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg mt-2 p-4 border">
          <PiramidaPendudukChart data={data.kelompokUmur} />
        </div>
      </div>

      {/* Grid untuk semua grafik lainnya */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* ... Grafik Dusun, Pendidikan, Pekerjaan, Perkawinan ... */}
        <div>
          <SectionTitle> Berdasarkan Dusun </SectionTitle>
          <div className="bg-white rounded-2xl shadow mt-2 p-4 h-[340px] flex items-center justify-center">
            <DusunChart data={data.dusun} />
          </div>
        </div>
        <div>
          <SectionTitle> Berdasarkan Pendidikan </SectionTitle>
          <div className="bg-white rounded-2xl shadow mt-2 p-4 h-[340px]">
            <PendidikanChart data={data.pendidikan} />
          </div>
        </div>
        <div>
          <SectionTitle> Berdasarkan Pekerjaan </SectionTitle>
          <div className="bg-white rounded-2xl shadow mt-2 p-4 h-[340px]">
            <PekerjaanChart data={data.pekerjaan} />
          </div>
        </div>
        <div>
          <SectionTitle> Berdasarkan Perkawinan </SectionTitle>
          <div className="bg-white rounded-2xl shadow mt-2 p-4 h-[340px]">
            <PerkawinanChart data={data.perkawinan} />
          </div>
        </div>
      </div>

      {/* 3. PERBAIKAN: Bagian Agama diubah menjadi layout kartu */}
      <div>
        <SectionTitle> Berdasarkan Agama </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
          {data.agama?.map((item) => (
            <Card
              key={item.nama}
              title={item.nama}
              value={`${item.jumlah || 0} Jiwa`}
              icon={
                item.nama === "Islam" ? (
                  <FaMosque />
                ) : item.nama === "Kristen" ? (
                  <FaCross />
                ) : (
                  <FaYinYang />
                ) // Ikon default
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Penduduk;
