import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function GaleriPage() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const response = await fetch("/api/galeri");
        const result = await response.json();

        // Mapping nama field dari Supabase agar cocok dengan FE
        const mapped = result.map((item) => ({
          id: item.id_galeri,
          image: item.gambar_galeri,
          caption: item.keterangan_gambar,
        }));

        const sorted = mapped.sort((a, b) => b.id - a.id);
        setData(sorted);
      } catch (error) {
        console.error("Gagal memuat data galeri:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGaleri();
  }, []);

  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return <p className="text-center py-10 text-gray-600">Memuat galeri...</p>;
  }

  return (
    <div className="min-h-screen py-10 bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-2">
          Galeri Desa
        </h2>
        <p className="mb-6 text-gray-600 text-sm sm:text-base">
          Dokumentasi kegiatan yang berlangsung di Desa Cikupa
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {paginatedData.map((item) => (
            <Card
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="shadow-md cursor-pointer rounded-xl overflow-hidden hover:shadow-lg hover:scale-105 transition duration-200 bg-white"
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <p className="text-sm text-gray-700">{item.caption}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2">
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
              size="sm"
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => handlePageChange(i + 1)}
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

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white p-4 rounded-xl w-full max-w-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt="Detail"
              className="w-full h-auto rounded-xl mb-3"
            />
            <p className="text-center text-gray-800 text-sm sm:text-base">
              {selectedImage.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
