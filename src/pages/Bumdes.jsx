import { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const data = [
  { id: 1, img: "/assets/produk1.png", text: "Produk unggulan 1" },
  { id: 2, img: "/assets/produk2.png", text: "Produk unggulan 2" },
  { id: 3, img: "/assets/produk3.png", text: "Produk unggulan 3" },
  { id: 4, img: "/assets/produk4.png", text: "Produk unggulan 4" },
  { id: 5, img: "/assets/produk5.png", text: "Produk unggulan 5" },
  { id: 6, img: "/assets/produk6.png", text: "Produk unggulan 6" },
];

const ITEMS_PER_PAGE = 6;

export default function BumdesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-2">Produk Unggulan</h2>
      <p className="mb-6 text-gray-600">
        Beberapa produk unggulan yang ada di Desa Cikupa
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {paginatedData.map((item) => (
          <Card key={item.id} className="shadow-md flex flex-col">
            <img
              src={item.img}
              alt={`Produk ${item.id}`}
              className="h-48 w-full object-cover rounded-t-md"
            />
            <CardContent className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-700 mb-2 text">{item.text}</p>
                <p className="font-bold mb-4 text-right">Rp. 30.000</p>
              </div>
              <Link
                to={`/produk/${item.id}`}
                className="inline-block mt-auto bg-green-600 text-white text-center py-2 px-4 rounded hover:bg-green-700"
              >
                Lihat Detail
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2">
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
  );
}
