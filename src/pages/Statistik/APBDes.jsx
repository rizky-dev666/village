import React, { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import PPChart from "../../components/charts/PPChart";
import PendapatanChart from "../../components/charts/pendapatanChart";
import BelanjaChart from "../../components/charts/belanjaChart";
import PembiayaanChart from "../../components/charts/pembiayaanChart";

const Apbdes = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [allData, setAllData] = useState([]);  // semua data dari backend
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const years = ["2024", "2023", "2022"]; // Bisa kamu buat dinamis dari allData juga

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch("/api/data-apbdes/");
        const json = await res.json();
        setAllData(json);
      } catch (err) {
        console.error("Gagal fetch semua data:", err);
        setError("Gagal mengambil data dari server.");
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const found = allData.find((item) => String(item.tahun) === selectedYear);
    if (found) {
      const mappedData = {
        tahun: found.tahun,
        pendapatan: found.pendapatan,
        belanja: found.belanja,
        surplusDefisit: found.surplus_defisit,
        pembiayaan: {
          penerimaan: found.penerimaan,
          pengeluaran: found.pengeluaran,
        },
      };
      setData(mappedData);
      setError(null);
    } else {
      setData(null);
      setError(`Data tidak ditemukan untuk tahun ${selectedYear}`);
    }
  }, [selectedYear, allData]);

  return (
    <div className="bg-[#f7f7f7] px-4 py-8 md:px-20 md:py-14">
      {/* Header & Dropdown */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
            APB Desa Cikupa Tahun {selectedYear}
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Desa Cikupa, Kecamatan Karangnunggal, Kabupaten Tasikmalaya, <br />
            Provinsi Jawa Barat
          </p>
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          {/* Dropdown Tahun */}
          <div className="flex justify-end">
            <select
              className="border border-gray-300 rounded-md px-4 py-2 shadow-sm"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-600 font-medium bg-white border p-4 rounded shadow-sm">
              {error}
            </div>
          )}

          {/* Pendapatan & Belanja */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex items-center text-green-700 font-semibold mb-2">
                <FaArrowDown className="mr-2" />
                Pendapatan
              </div>
              <div className="text-green-700 text-xl font-bold">
                {data?.pendapatan?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }) || "Rp0,00"}
              </div>
            </div>
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex items-center text-red-600 font-semibold mb-2">
                <FaArrowUp className="mr-2" />
                Belanja
              </div>
              <div className="text-red-600 text-xl font-bold">
                {data?.belanja?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }) || "Rp0,00"}
              </div>
            </div>
          </div>

          {/* Pembiayaan */}
          <div className="bg-white border rounded-lg shadow-sm">
            <div className="border-b p-4">
              <h3 className="font-semibold text-gray-800">Pembiayaan</h3>
            </div>
            <div className="grid grid-cols-2 divide-x">
              <div className="p-4 flex flex-col justify-center">
                <div className="flex items-center text-green-700 font-semibold mb-1">
                  <FaArrowDown className="mr-2" />
                  Penerimaan
                </div>
                <div className="text-green-700 text-xl font-bold">
                  {data?.pembiayaan?.penerimaan?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }) || "Rp0,00"}
                </div>
              </div>
              <div className="p-4 flex flex-col justify-center">
                <div className="flex items-center text-gray-700 font-semibold mb-1">
                  <span className="w-2 h-2 rounded-full bg-gray-500 mr-2"></span>
                  Pengeluaran
                </div>
                <div className="text-gray-800 text-xl font-bold">
                  {data?.pembiayaan?.pengeluaran?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }) || "Rp0,00"}
                </div>
              </div>
            </div>
          </div>

          {/* Surplus/Defisit */}
          <div className="bg-white border rounded-lg p-4 shadow-sm flex justify-between font-semibold text-gray-800">
            <span>Surplus/Defisit</span>
            <span>
              {data?.surplusDefisit?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              }) || "Rp0,00"}
            </span>
          </div>
        </div>
      </div>

      {/* Grafik */}
      {data && (
        <>
          {/* <div className="mt-12">
            <PPChart selectedYear={selectedYear} />
          </div> */}
          {/* <div className="mt-20">
            <PendapatanChart selectedYear={selectedYear} />
          </div> */}
          {/* <div className="mt-20">
            <BelanjaChart tahunDipilih={selectedYear} />
          </div> */}
          {/* <div className="mt-20">
            <PembiayaanChart tahunDipilih={selectedYear} />
          </div> */}
        </>
      )}
    </div>
  );
};

export default Apbdes;
