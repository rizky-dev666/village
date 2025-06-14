import { useEffect, useState } from "react";
import { galeriDummy } from "../components/data/galeriDummy";
import { Card, CardContent } from "../components/ui/Card";
import { Link } from "react-router-dom";

export default function GaleriSection() {
  const [latestGaleri, setLatestGaleri] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const sorted = [...galeriDummy].sort((a, b) => b.id - a.id);
    setLatestGaleri(sorted.slice(0, 6)); // Ambil 6 galeri terbaru
  }, []);

  return (
    <section className="bg-[#f7f7f7] px-4 py-10 sm:px-6 lg:px-16">
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-1">Galeri Desa</h2>
        <p className="text-gray-700 text-sm sm:text-base">
          Menampilkan dokumentasi kegiatan Desa Cikupa
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {latestGaleri.map((item) => (
          <Card
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="rounded-xl overflow-hidden shadow hover:shadow-lg hover:scale-105 transition duration-200 bg-white cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.caption}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <p className="text-sm text-gray-800">{item.caption}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center sm:justify-end">
        <Link to="/galeri">
          <button className="bg-white text-gray-600 font-medium px-6 py-2 rounded-md shadow hover:shadow-md hover:scale-105 transition duration-200">
            Lihat Selengkapnya
          </button>
        </Link>
      </div>

      {/* Modal Preview */}
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
              alt={selectedImage.caption}
              className="w-full h-auto rounded-xl mb-3"
            />
            <p className="text-center text-gray-800">{selectedImage.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
