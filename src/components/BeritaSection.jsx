import { useNavigate } from "react-router-dom";
import CardBerita from "../components/CardBerita";
import { useEffect, useState } from "react";
import axios from "axios";

const BeritaSection = () => {
  const navigate = useNavigate();
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await axios.get("/api/berita");

        const formatted = res.data
          .map((item) => ({
            id: item.id_berita,
            judul: item.judul_berita,
            isi: item.isi_berita,
            penulis: item.penulis_berita || "Administrator",
            gambar: item.gambar_berita,
            dilihat: item.dilihat || 0,
            createdAt: item.created_at,
          }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3); // Ambil 3 berita terbaru

        setBerita(formatted);
      } catch (err) {
        console.error("Gagal mengambil data berita:", err);
      }
    };

    fetchBerita();
  }, []);

  return (
    <section className="bg-[#f7f7f7] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul dan Deskripsi */}
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-700">Berita Desa</h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Menyajikan informasi terbaru tentang berita terbaru di Desa Cikupa
          </p>
        </div>

        {/* Kartu Berita */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {berita.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(`/berita/${item.id}`, { state: { fromHome: true } })
              }
              className="cursor-pointer"
            >
              <CardBerita berita={item} />
            </div>
          ))}
        </div>

        {/* Tombol */}
        <div className="flex justify-center sm:justify-end mt-8">
          <button
            onClick={() => navigate("/berita")}
            className="bg-white text-gray-600 font-medium px-6 py-2 rounded-md shadow hover:shadow-md hover:scale-105 transition duration-200"
          >
            Lihat Selengkapnya
          </button>
        </div>
      </div>
    </section>
  );
};

export default BeritaSection;
