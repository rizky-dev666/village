import React from "react";
import { FaEye, FaDownload, FaFilePdf, FaRegCalendarAlt } from "react-icons/fa";

const SKSection = () => {
  const skDesa = [
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
  ];

  return (
    <section className="w-full py-12 px-4 md:px-6 bg-[#F7F7F7]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-[#2E7D32] text-2xl md:text-3xl font-extrabold mb-1 text-left">SK Desa</h2>
        <div className="space-y-4">
          {skDesa.map((sk) => (
            <div
              key={sk.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-gray-200 rounded-md p-4 shadow hover:shadow-md transition-all gap-4"
            >
              {/* Icon PDF */}
              <div className="flex items-center gap-3">
                <FaFilePdf className="text-red-600 text-3xl min-w-[32px]" />
              </div>

              {/* Judul & Tanggal */}
              <div className="flex-1">
                <p className="font-semibold text-sm md:text-base">{sk.judul}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <FaRegCalendarAlt className="mr-1" />
                  {sk.tanggal}
                </div>
              </div>

              {/* Tombol Aksi */}
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
  );
};

export default SKSection;
