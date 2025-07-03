import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const ITEMS_PER_PAGE = 6;

export default function UMKMSection() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/produk");
        const mappedData = response.data.map((item) => ({
          id: item.id_produk,
          title: item.nama_produk,
          description: item.deskripsi_produk,
          image: item.gambar_produk || "/assets/default-image.png",
          price: item.harga || 0,
        }));
        setData(mappedData);
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
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

  const handleCardClick = (item) => {
    navigate(`/produk/${item.id}`);
  };

  return (
    <div className="min-h-screen py-10 bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-4xl font-bold text-green-700 mb-1">
          UMKM Desa Cikupa
        </h2>
        <p className="mb-6 text-gray-600 text-sm sm:text-xl">
          Beberapa produk unggulan yang ada di Desa Cikupa
        </p>

        {loading ? (
          <p className="text-center text-gray-600 py-10">Memuat data...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {paginatedData.map((item) => (
                <Card
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-200 bg-white rounded-xl shadow-sm overflow-hidden border"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4 flex flex-col justify-between h-40">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-base mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-right font-semibold text-sm text-gray-800 mt-auto">
                      Rp. {item.price.toLocaleString("id-ID")}
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
      </div>
    </div>
  );
}
