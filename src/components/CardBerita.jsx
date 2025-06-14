import { FaUser, FaEye } from "react-icons/fa";

// Fungsi format tanggal
const formatTanggal = (tanggalISO) => {
  const tanggal = new Date(tanggalISO);
  return tanggal.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const CardBerita = ({ berita }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg hover:scale-105 transition duration-200 h-full cursor-pointer">
      {/* Gambar */}
      <img
        src={berita.gambar || "https://via.placeholder.com/400x300?text=No+Image"}
        alt={berita.judul}
        className="w-full h-40 sm:h-48 md:h-56 object-cover"
      />

      {/* Konten */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 text-left">
          {berita.judul}
        </h2>

        <p className="text-sm sm:text-sm text-gray-700 mb-4 line-clamp-3 text-left">
          {Array.isArray(berita.isi) ? berita.isi[0] : berita.isi}
        </p>

        {/* Info Admin dan View */}
        <div className="flex justify-between items-end mt-auto flex-wrap gap-2">
          <div className="text-xs text-gray-500 flex flex-col gap-1">
            <span className="flex items-center gap-1">
              <FaUser /> {berita.penulis || "Administrator"}
            </span>
            <span className="flex items-center gap-1">
              <FaEye /> {berita.dilihat} kali
            </span>
          </div>
          <div>
            <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
              {berita.createdAt ? formatTanggal(berita.createdAt) : "Tanggal tidak tersedia"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBerita;
