import React, { useState } from "react";
import statistikData from "../../components/data/statistikData";

const Penduduk = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("2024 - Semester 1");
  const [selectedRW, setSelectedRW] = useState("RW 1");

  const rwList = Array.from({ length: 12 }, (_, i) => `RW ${i + 1}`);
  const data = statistikData[selectedPeriod]?.[selectedRW];

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Dropdown Periode */}
      <div className="flex justify-end">
        <select
          className="border border-gray-300 rounded px-4 py-2"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          {Object.keys(statistikData).map((period) => (
            <option key={period} value={period}>{period}</option>
          ))}
        </select>
      </div>

      {/* Peta Interaktif */}
      <div>
        <h2 className="text-lg font-semibold text-green-700 mb-2">Peta Sebaran Desa</h2>
        <div className="relative w-full h-[500px] bg-gray-100 rounded shadow overflow-hidden">
          <img
            src="/images/peta-sebaran.png"
            alt="Peta Desa"
            className="absolute top-0 left-0 w-full h-full object-cover rounded"
          />
          {rwList.map((rw, index) => (
            <div
              key={rw}
              onClick={() => setSelectedRW(rw)}
              className={`absolute cursor-pointer transition-all duration-300 rounded-full 
                bg-green-600/80 text-white text-xs flex items-center justify-center font-semibold
                ${selectedRW === rw ? "scale-125 bg-green-800 z-10" : "scale-100 z-0"}`}
              style={{
                top: `${45 + index * 3}%`,
                left: `${35 + (index % 4) * 5}%`,
                width: 30,
                height: 30,
              }}
            >
              {rw.split(" ")[1]}
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-700">RW terpilih: <strong>{selectedRW}</strong></p>
      </div>

      {/* Jumlah Penduduk */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Jumlah Penduduk" value={`${data?.totalPenduduk || 0} Jiwa`} />
        <Card title="Jumlah Kepala Keluarga" value={`${data?.kepalaKeluarga || 0} KK`} />
        <Card title="Jumlah Perempuan" value={`${data?.perempuan || 0} Jiwa`} />
        <Card title="Jumlah Laki - Laki" value={`${data?.lakiLaki || 0} Jiwa`} />
      </div>

      {/* Kelompok Umur */}
      <SectionTitle> Berdasarkan Kelompok Umur </SectionTitle>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm text-center">
          <thead>
            <tr className="bg-green-100">
              <th className="px-4 py-2">Kelompok Umur</th>
              <th className="px-4 py-2">Laki-laki</th>
              <th className="px-4 py-2">Perempuan</th>
            </tr>
          </thead>
          <tbody>
            {data?.kelompokUmur?.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{item.umur}</td>
                <td className="px-4 py-2">{item.laki}</td>
                <td className="px-4 py-2">{item.perempuan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dusun */}
      <SectionTitle> Berdasarkan Dusun </SectionTitle>
      <ul className="list-disc ml-5 space-y-1">
        {data?.dusun?.map((dusun, idx) => (
          <li key={idx}>{dusun.nama}: {dusun.persentase}%</li>
        ))}
      </ul>

      {/* Pendidikan */}
      <SectionTitle> Berdasarkan Pendidikan </SectionTitle>
      <ul className="list-disc ml-5 space-y-1">
        {data?.pendidikan &&
          Object.entries(data.pendidikan).map(([k, v], idx) => (
            <li key={idx}>{k}: {v} orang</li>
          ))}
      </ul>

      {/* Pekerjaan */}
      <SectionTitle> Berdasarkan Pekerjaan </SectionTitle>
      <ul className="list-disc ml-5 space-y-1">
        {data?.pekerjaan?.map((item, idx) => (
          <li key={idx}>{item.nama}: {item.jumlah} orang</li>
        ))}
      </ul>

      {/* Perkawinan */}
      <SectionTitle> Berdasarkan Perkawinan </SectionTitle>
      <ul className="list-disc ml-5 space-y-1">
        {data?.perkawinan?.map((item, idx) => (
          <li key={idx}>{item.status}: {item.jumlah} orang</li>
        ))}
      </ul>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="p-4 border rounded shadow bg-white">
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className="text-xl font-semibold text-green-700">{value}</p>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-green-700 mt-8">{children}</h2>
);

export default Penduduk;
