import React, { useEffect, useState } from "react";
import axios from "axios";

const BaganSection = () => {
  const [struktur, setStruktur] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStruktur = async () => {
      try {
        const response = await axios.get("/api/struktur-organisasi");
        setStruktur(response.data);
      } catch (error) {
        console.error("Gagal fetch struktur organisasi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStruktur();
  }, []);

  return (
    <section className="w-full py-12 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-[#2E7D32] text-2xl md:text-3xl font-extrabold mb-1 text-left">
            Bagan Desa
          </h2>
          <p className="text-sm md:text-base font-medium text-left">
            Susunan organisasi dan tata kerja (SOTK) Pemerintah Desa
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <img
            src="/assets/bagan.png"
            alt="Bagan Desa"
            className="rounded-md border border-gray-300 shadow-md bg-white w-full max-w-[768px]"
          />
        </div>

        {loading ? (
          <p className="text-center">Memuat data...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {struktur.map((staff) => (
              <div
                key={staff.id_struktur_organisasi}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-4 text-center"
              >
                <img
                  src={staff.foto_staff}
                  alt={staff.nama_staff}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {staff.nama_staff}
                </h3>
                <p className="text-sm text-gray-500">{staff.jabatan}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BaganSection;
