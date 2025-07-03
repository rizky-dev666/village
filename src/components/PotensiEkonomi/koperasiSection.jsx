import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function KoperasiSection() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/koperasi/");
        console.log("DATA KOPERASI:", response.data);

        if (Array.isArray(response.data)) {
          const koperasiData = response.data.map((item) => ({
            id: item.id_koperasi,
            title: item.nama_koperasi,
            description: item.jenis_layanan,
            image: item.gambar_koperasi || "/default-image.png",
            jam_operasional: item.jam_operasional,
            kontak: item.kontak,
            alamat: item.alamat,
          }));

          setData(koperasiData.reverse());
        } else {
          setError("Format data dari server tidak sesuai");
        }
      } catch (err) {
        console.error("Gagal mengambil data koperasi:", err);
        setError("Gagal memuat data koperasi");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  return (
    <div className="min-h-screen py-10 bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-4xl font-bold text-green-700 mb-1">
          Koperasi Desa
        </h2>
        <p className="mb-6 text-gray-600 text-sm sm:text-xl">
          Koperasi dalam pemberdayaan ekonomi masyarakat
        </p>

        {loading ? (
          <p className="text-center text-gray-600 py-10">Memuat data...</p>
        ) : error ? (
          <p className="text-center text-red-600 py-10">{error}</p>
        ) : (
          <>
            {paginatedData.length === 0 ? (
              <p className="text-center text-gray-600 py-10">Belum ada data koperasi.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                  {paginatedData.map((item) => (
                    <Card
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-200 bg-white rounded-xl shadow-sm overflow-hidden border"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => (e.target.src = "/default-image.png")}
                      />
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <User size={14} />
                          Administrator
                        </div>
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
              </>
            )}
          </>
        )}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white p-6 rounded-xl w-full max-w-3xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-96 overflow-hidden rounded-xl mb-4">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {selectedItem.title}
            </h3>
            <p className="text-gray-700 text-base mb-2">
              <strong>Jenis Layanan:</strong> {selectedItem.description}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <strong>Alamat:</strong> {selectedItem.alamat}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <strong>Jam Operasional:</strong> {selectedItem.jam_operasional}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Kontak:</strong> {selectedItem.kontak}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
