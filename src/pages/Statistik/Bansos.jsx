import React, { useEffect, useState } from "react";
import axios from "axios";

const Bansos = () => {
  const [dataBansos, setDataBansos] = useState([]);
  const [error, setError] = useState(null);
  const [rawData, setRawData] = useState([]);
  const [availableSemesters, setAvailableSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");

  useEffect(() => {
    fetchDataBansos();
  }, []);

  useEffect(() => {
    if (rawData.length > 0) {
      filterDataBySemester(selectedSemester);
    }
  }, [rawData, selectedSemester]);

  const fetchDataBansos = async () => {
    try {
      const response = await axios.get("/api/data-bantuan");
      const data = response.data;
      setRawData(data);

      const semestersFromData = [...new Set(data.map((item) => item.tahun))];

      setAvailableSemesters(semestersFromData);

      setSelectedSemester(semestersFromData[0] || "");
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setError("Terjadi kesalahan saat mengambil data.");
    }
  };

  const filterDataBySemester = (semester) => {
    const filtered = rawData.filter((item) => item.tahun === semester);

    if (filtered.length === 0) {
      setError(`Data tidak ditemukan untuk semester ${semester}.`);
      setDataBansos([
        { nama: "BPJS PBI Ketenagakerjaan", jumlah: 0 },
        { nama: "PKH", jumlah: 0 },
        { nama: "BPNT", jumlah: 0 },
        { nama: "PSTN", jumlah: 0 },
        { nama: "BLT", jumlah: 0 },
      ]);
      return;
    }

    const data = [
      { nama: "BPJS PBI Ketenagakerjaan", jumlah: sumField(filtered, "pbi_jkn") },
      { nama: "PKH", jumlah: sumField(filtered, "pkh") },
      { nama: "BPNT", jumlah: sumField(filtered, "bnpt") },
      { nama: "PSTN", jumlah: sumField(filtered, "stunting") },
      { nama: "BLT", jumlah: sumField(filtered, "blt") },
    ];

    setDataBansos(data);
    setError(null);
  };

  const sumField = (dataArray, field) => {
    return dataArray.reduce((total, item) => {
      const val = parseInt(item[field], 10);
      return total + (isNaN(val) ? 0 : val);
    }, 0);
  };

  return (
    <section className="bg-[#f7f7f7] py-12 px-6 md:px-16">
      {/* Judul dan Dropdown */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4 md:mb-0">
          Jumlah Penerima Bansos
        </h2>

        {availableSemesters.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-semibold whitespace-nowrap">
              Pilih Semester:
            </label>
            <select
              className="p-2 border border-gray-300 rounded"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              {availableSemesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-600 font-semibold mb-6 bg-white p-4 rounded shadow">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {dataBansos.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg px-8 py-8 flex items-center"
          >
            <div className="w-24 text-center mr-6">
              <p className="text-5xl font-bold text-black">{item.jumlah}</p>
              <p className="text-lg text-gray-800 font-semibold mt-2">Penduduk</p>
            </div>

            <div className="text-left">
              <p className="text-base text-black">mendapatkan bantuan</p>
              <p className="text-xl font-bold text-gray-900">{item.nama}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bansos;
