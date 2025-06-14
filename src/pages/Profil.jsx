import React, { useState, useEffect } from 'react';
import { FaEye, FaDownload, FaFilePdf, FaRegCalendarAlt } from "react-icons/fa";

const Profil = () => {
  const [data, setData] = useState({
    visi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    misi: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    ],
    sejarah: {
      pembuka: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      penekanan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    batas: {
      utara: "Desa Karangnunggal (Kecamatan Karangnunggal)",
      selatan: "Desa Cikapinis (Kecamatan Karangnunggal)",
      barat: "Kecamatan Bantarkalong (Kabupaten Tasikmalaya)",
      timur: "Desa Cilawu (Kecamatan Karangnunggal)"
    },
    luas: "8.670.000 m²",
    penduduk: "6.376 jiwa",
    skDesa: [
      {
        id: 1,
        judul: "Lorem Ipsum dolor sit amet",
        tanggal: "22 Mei 2022",
        file: "/assets/sk1.pdf"
      },
      {
        id: 2,
        judul: "Lorem Ipsum dolor sit amet",
        tanggal: "22 Mei 2022",
        file: "/assets/sk2.pdf"
      },
      {
        id: 3,
        judul: "Lorem Ipsum dolor sit amet",
        tanggal: "22 Mei 2022",
        file: "/assets/sk3.pdf"
      }
    ]
  });

  return (
    <div className="text-[#1E1E1E]">

      {/* VISI MISI */}
      <section className="flex flex-col md:flex-row gap-6 justify-center px-4 md:px-6 py-10 bg-[#F7F7F7]">
        <div className="w-full md:w-1/2 border-[2.5px] border-[#2E7D32] rounded-md bg-white p-6 shadow-lg">
          <h3 className="text-[#2E7D32] text-lg md:text-xl font-bold text-center mb-4">Visi</h3>
          <p className="text-justify text-base leading-relaxed">{data.visi}</p>
        </div>
        <div className="w-full md:w-1/2 border-[2.5px] border-[#2E7D32] rounded-md bg-white p-6 shadow-lg">
          <h3 className="text-[#2E7D32] text-lg md:text-xl font-bold text-center mb-4">Misi</h3>
          <ol className="list-decimal pl-5 space-y-2 text-base leading-relaxed text-justify">
            {data.misi.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* SEJARAH DESA */}
      <section className="w-full py-12 px-4 md:px-6 bg-[#F7F7F7]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[#2E7D32] text-3xl md:text-4xl font-extrabold mb-1">Sejarah Desa</h2>
          <p className="text-sm md:text-base font-medium text-black mb-6">Sejarah tentang Desa Cikupa</p>

          <div className="bg-[#2E7D32] text-white border-[4px] border-[#FFB300] rounded-lg p-6 md:p-8 text-justify shadow-md">
            <p className="mb-4">{data.sejarah.pembuka}</p>
            <p>{data.sejarah.penekanan}</p>
          </div>
        </div>
      </section>

      {/* BAGAN DESA */}
      <section className="w-full py-12 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-[#2E7D32] text-2xl md:text-3xl font-extrabold mb-1 text-left">Bagan Desa</h2>
            <p className="text-sm md:text-base font-medium text-left">Susunan organisasi dan tata kerja (SOTK) Pemerintah Desa</p>
          </div>
          <div className="flex justify-center">
            <img
              src="/assets/bagan.png"
              alt="Bagan Desa"
              className="rounded-md border border-gray-300 shadow-md bg-white w-full max-w-[768px]"
            />
          </div>
        </div>
      </section>

      {/* PETA LOKASI */}
      <section className="w-full py-12 px-4 md:px-6 bg-[#F7F7F7]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#2E7D32] text-2xl md:text-3xl font-extrabold mb-1 text-left">Peta Lokasi</h2>
          <p className="text-sm md:text-base font-medium mb-6 text-left">Letak Peta Lokasi Desa Cikupa</p>

          <div className="flex flex-col-reverse md:flex-row gap-6">
            {/* Keterangan Batas, Luas & Penduduk */}
            <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 w-full md:w-1/2 space-y-3 text-sm md:text-base">
              <div>
                <p className="font-semibold">Batas Desa:</p>
                <p>Utara: {data.batas.utara}</p>
                <p>Selatan: {data.batas.selatan}</p>
                <p>Barat: {data.batas.barat}</p>
                <p>Timur: {data.batas.timur}</p>
              </div>
              <hr />
              <div>
                <p className="font-semibold">Luas Desa:</p>
                <p>{data.luas}</p>
              </div>
              <hr />
              <div>
                <p className="font-semibold">Jumlah Penduduk:</p>
                <p>{data.penduduk}</p>
              </div>
            </div>

            {/* Gambar Peta */}
            <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 w-full md:w-1/2 flex justify-center items-center">
              <img
                src="/assets/petlok.png"
                alt="Peta Lokasi"
                className="max-w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SK DESA */}
      <section className="w-full py-12 px-4 md:px-6 bg-[#F7F7F7]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[#2E7D32] text-2xl md:text-3xl font-extrabold mb-1 text-left">SK Desa</h2>
          <div className="space-y-4">
            {data.skDesa.map((sk) => (
              <div
                key={sk.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-gray-200 rounded-md p-4 shadow hover:shadow-md transition-all gap-4"
              >
                {/* Kiri: Icon PDF */}
                <div className="flex items-center gap-3">
                  <FaFilePdf className="text-red-600 text-3xl min-w-[32px]" />
                </div>

                {/* Tengah: Judul & Tanggal */}
                <div className="flex-1">
                  <p className="font-semibold text-sm md:text-base">{sk.judul}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <FaRegCalendarAlt className="mr-1" />
                    {sk.tanggal}
                  </div>
                </div>

                {/* Kanan: Tombol Aksi Vertikal */}
                <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                  <a
                    href={sk.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 justify-center text-xs sm:text-sm w-full sm:w-auto"
                  >
                    <FaEye /> Lihat file
                  </a>
                  <a
                    href={sk.file}
                    download
                    className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 justify-center text-xs sm:text-sm w-full sm:w-auto"
                  >
                    <FaDownload /> Unduh file
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profil;
