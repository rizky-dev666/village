import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";

const DisabilitasSection = () => {
  const [dataDisabilitas, setDataDisabilitas] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [availableSemesters, setAvailableSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataDisabilitas();
  }, []);

  useEffect(() => {
    if (rawData.length > 0) {
      filterDataBySemester(selectedSemester);
    }
  }, [rawData, selectedSemester]);

  const fetchDataDisabilitas = async () => {
    try {
      const response = await axios.get("/api/data-disabilitas/");
      const data = response.data;
      setRawData(data);

      const semestersFromData = [...new Set(data.map((item) => item.tahun))];

      setAvailableSemesters(semestersFromData);

      setSelectedSemester(semestersFromData[0] || "");
    } catch (error) {
      console.error("Error fetching data disabilitas:", error);
      setError("Terjadi kesalahan saat mengambil data.");
    }
  };

  const filterDataBySemester = (semester) => {
    const filtered = rawData.filter((item) => item.tahun === semester);

    if (filtered.length === 0) {
      setError(`Data tidak ditemukan untuk semester ${semester}.`);
      setDataDisabilitas([
        { nama: "Tuna Daksa", jumlah: 0 },
        { nama: "Tuna Rungu", jumlah: 0 },
        { nama: "Tuna Wicara", jumlah: 0 },
        { nama: "Tuna Netra", jumlah: 0 },
        { nama: "Tuna Laras", jumlah: 0 },
        { nama: "Lainnya", jumlah: 0 },
      ]);
      return;
    }

    const data = [
      { nama: "Tuna Daksa", jumlah: sumField(filtered, "tuna_daksa") },
      { nama: "Tuna Rungu", jumlah: sumField(filtered, "tuna_rungu") },
      { nama: "Tuna Wicara", jumlah: sumField(filtered, "tuna_wicara") },
      { nama: "Tuna Netra", jumlah: sumField(filtered, "tuna_netra") },
      { nama: "Tuna Laras", jumlah: sumField(filtered, "tuna_laras") },
      { nama: "Lainnya", jumlah: sumField(filtered, "lainnya") },
    ];

    setDataDisabilitas(data);
    setError(null);
  };

  const sumField = (dataArray, field) => {
    return dataArray.reduce((total, item) => {
      const val = parseInt(item[field], 10);
      return total + (isNaN(val) ? 0 : val);
    }, 0);
  };

  const DisabilitasCard = ({ nama, jumlah }) => (
    <div className="bg-white shadow-md rounded-2xl px-6 py-5 flex items-center justify-between w-[300px] h-[110px]">
      <div>
        <div className="text-green-700 font-semibold text-base">{nama}</div>
        <div className="text-4xl font-bold mt-1">{jumlah}</div>
      </div>
      <FaRegUser className="text-green-600 w-10 h-10" />
    </div>
  );

  return (
    <section className="bg-[#f7f7f7] py-12 px-6 md:px-16">
      {/* Judul dan Dropdown */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4 md:mb-0">
          Jumlah Penyandang Disabilitas
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

      {/* Error Message */}
      {error && (
        <p className="text-red-600 font-semibold mb-6 bg-white p-4 rounded shadow">
          {error}
        </p>
      )}

      {/* Card Layout */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-8 flex-wrap justify-center">
          {dataDisabilitas.slice(0, 3).map((item, index) => (
            <DisabilitasCard key={index} nama={item.nama} jumlah={item.jumlah} />
          ))}
        </div>

        <div className="flex gap-8 flex-wrap justify-center">
          {dataDisabilitas.slice(3, 6).map((item, index) => (
            <DisabilitasCard key={index + 3} nama={item.nama} jumlah={item.jumlah} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DisabilitasSection;
