import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaHome,
} from "react-icons/fa";
import axios from "axios";

export default function DetailProduk() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const res = await axios.get(`/api/produk/${id}`);
        const data = res.data;
        setProduk({
          id: data.id_produk,
          title: data.nama_produk,
          image: data.gambar_produk || "/assets/default-image.png",
          price: data.harga,
          wa: data.no_tlp,
          description: data.deskripsi_produk || "-",
          pemilik: data.nama_pemilik || "Tidak diketahui",
          date: data.created_at
            ? new Date(data.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Tanggal tidak tersedia",
        });
      } catch (error) {
        console.error("Gagal mengambil detail produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <p className="text-gray-600">Memuat data produk...</p>
      </div>
    );
  }

  if (!produk) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <p className="text-gray-600">Produk tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-[#f7f7f7] px-4 py-10">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl px-8 py-12 relative">
        {/* Tombol kembali */}
        <button
          onClick={() => navigate("/bumdes")}
          className="absolute top-6 left-6 text-gray-600 hover:text-gray-900 flex items-center gap-1"
        >
          <FaHome size={16} />
          <span className="text-sm font-medium">/ UMKM</span>
        </button>

        {/* Konten */}
        <div className="flex flex-col lg:flex-row gap-12 mt-10">
          {/* Gambar Produk */}
          <div className="w-full lg:w-1/2">
            <img
              src={produk.image}
              alt={produk.title}
              className="w-full h-[450px] object-cover rounded-lg shadow-sm"
            />
          </div>

          {/* Info Produk */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                <FaUser size={14} /> {produk.pemilik} • {produk.date}
              </p>

              <h1 className="text-2xl font-semibold text-gray-800 mb-4 leading-snug">
                {produk.title}
              </h1>

              <p className="text-gray-700 text-base mb-4">
                {produk.description}
              </p>

              <p className="text-xl font-bold text-gray-800 mb-4">
                Rp. {produk.price.toLocaleString("id-ID")}
              </p>

              {/* Tombol WA */}
              <a
                href={`https://wa.me/${produk.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-md text-sm font-medium transition"
              >
                Chat Penjual
              </a>

              {/* Bagikan */}
              <div className="mt-16">
                <p className="text-sm text-gray-500 mb-2">Bagikan</p>
                <div className="flex gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full"
                  >
                    <FaFacebookF className="text-gray-600" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full"
                  >
                    <FaTwitter className="text-gray-600" />
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      produk.title + " - " + window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full"
                  >
                    <FaWhatsapp className="text-gray-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
