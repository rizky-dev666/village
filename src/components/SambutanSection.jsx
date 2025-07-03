import React, { useEffect, useState } from "react";
import axios from "axios";

const SambutanSection = () => {
  const [kades, setKades] = useState(null);
  const [sambutan, setSambutan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil data struktur organisasi
        const resStruktur = await axios.get("/api/struktur-organisasi", {
          withCredentials: true,
        });

        // Cari data kepala desa berdasarkan jabatan
        const kepalaDesa = resStruktur.data.find((staff) =>
          staff.jabatan.toLowerCase().includes("kepala desa")
        );

        if (kepalaDesa) {
          setKades(kepalaDesa);
        }

        // Ambil data sambutan dari informasi_desa (misalnya id 1)
        const resSambutan = await axios.get("/api/desa/273174c3-fdd6-450e-a1bd-ebfe052d5aae", {
          withCredentials: true,
        });

        setSambutan(resSambutan.data);
      } catch (error) {
        console.error("Gagal memuat data sambutan:", error);
      }
    };

    fetchData();
  }, []);

  if (!kades || !sambutan) {
    return (
      <section className="py-12 px-4 sm:px-6 md:px-10 bg-[#f7f7f7]">
        <div className="text-center text-gray-600">Memuat sambutan...</div>
      </section>
    );
  }

  return (
    <section className="bg-[#f7f7f7] py-12 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">

        {/* Foto Kepala Desa */}
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full border-[3px] border-green-700 overflow-hidden">
            <img
              src={kades.foto_staff}
              alt={`Foto ${kades.nama_staff}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Teks Sambutan */}
        <div className="flex-1 text-center md:text-left mt-6 md:mt-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-1">
            Sambutan {kades.jabatan}
          </h2>
          <p className="text-base sm:text-lg font-bold text-black">{kades.nama_staff}</p>
          <p className="text-sm text-gray-800 mb-4">{kades.jabatan}</p>

          <hr className="border border-gray-400 w-full mb-4" />

          <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed">
            {sambutan.prakata_kades}

            <div>
              <p>Hormat saya,</p>
              <div className="mt-6">
                <p className="font-bold text-black">{kades.nama_staff}</p>
                <p className="text-sm text-gray-800">{kades.jabatan}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SambutanSection;