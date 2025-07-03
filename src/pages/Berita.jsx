import { useEffect, useState } from "react";
import CardBerita from "../components/CardBerita";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const Berita = () => {
  const [berita, setBerita] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const beritaPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await axios.get("/api/berita");

        const formattedData = response.data.map((item) => ({
          id: item.id_berita,
          judul: item.judul_berita,
          isi: item.isi_berita,
          penulis: item.penulis_berita || "Administrator",
          gambar: item.gambar_berita,
          dilihat: item.dilihat || 0,
          createdAt: item.created_at,
        }));

        // Urutkan berdasarkan id berita (terbaru di atas)
        const sorted = formattedData.sort((a, b) => b.id - a.id);
        setBerita(sorted);
      } catch (error) {
        console.error("Gagal mengambil data berita:", error);
      }
    };

    fetchBerita();
  }, []);

  const totalPages = Math.ceil(berita.length / beritaPerPage);

  const currentBerita = berita.slice(
    (currentPage - 1) * beritaPerPage,
    currentPage * beritaPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#f7f7f7]">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-2 text-left">
          Berita Desa
        </h1>
        <p className="text-sm sm:text-base text-gray-700 text-left">
          Menyajikan informasi terbaru tentang berita di Desa Cikupa
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {currentBerita.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/berita/${item.id}`)}
            className="cursor-pointer"
          >
            <CardBerita berita={item} />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </Button>

        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            variant={currentPage === i + 1 ? "default" : "outline"}
            size="sm"
          >
            {i + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Berita;
