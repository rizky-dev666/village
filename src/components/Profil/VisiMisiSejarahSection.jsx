import React, { useState, useEffect } from "react";
import axios from "axios";


const VisiMisiSejarahSection = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const desaId = "273174c3-fdd6-450e-a1bd-ebfe052d5aae";
  useEffect(() => {
    const fetchInformasi = async () => {
      try {
        const response = await axios.get(`/api/desa/${desaId}`);
        const res = response.data;

        // Pecah misi dan sejarah berdasarkan newline
        setData({
          visi: res.visi_desa,
          misi: res.misi_desa?.split("\n") || [],
          sejarah: {
            pembuka: res.sejarah_desa?.split("\n")[0] || "",
            penekanan: res.sejarah_desa?.split("\n")[1] || "",
          },
        });
      } catch (err) {
        console.error("Gagal memuat informasi desa:", err);
        setError("Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInformasi();
  }, []);

  if (loading) return <p>Memuat informasi desa...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>Data tidak tersedia.</p>;

  return (
    <div className="text-[#1E1E1E]">
      {/* VISI & MISI */}
      <section className="flex flex-col md:flex-row gap-6 justify-center px-4 md:px-6 py-10 bg-[#F7F7F7]">
        {/* VISI */}
        <div className="w-full md:w-1/2 border-[2.5px] border-[#2E7D32] rounded-md bg-white p-6 shadow-lg">
          <h3 className="text-[#2E7D32] text-lg md:text-xl font-bold text-center mb-4">Visi</h3>
          <p className="text-justify text-base leading-relaxed">{data.visi}</p>
        </div>

        {/* MISI */}
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
    </div>
  );
};

export default VisiMisiSejarahSection;
