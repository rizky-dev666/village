import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import produkData from "../components/data/produkDummy";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  MessageSquareText,
} from "lucide-react";

export default function DetailProduk() {
  const { id } = useParams();
  const [produk, setProduk] = useState(null);

  useEffect(() => {
    const selected = produkData.find((item) => item.id === parseInt(id));
    setProduk(selected);
  }, [id]);

  if (!produk) return <p className="text-center mt-10">Produk tidak ditemukan.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-sm text-gray-500 mb-4">
          <span className="text-gray-400">/</span> Produk Unggulan
        </p>
        <div className="md:flex gap-6">
          <div className="flex-shrink-0">
            <img
              src={produk.img}
              alt={produk.text}
              className="rounded-md w-full md:w-80 object-cover"
            />
          </div>
          <div className="flex-1 mt-6 md:mt-0">
            <h1 className="text-xl md:text-2xl font-bold mb-2">{produk.text}</h1>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="mr-2">👤 Administrator</span>
              <span>📅 22 Mei 2022</span>
            </div>
            <p className="text-lg font-bold text-gray-800 mb-4">Rp. 30.000</p>
            <a
              href={`https://wa.me/${produk.whatsapp || "6281234567890"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded mb-6"
            >
              Chat Penjual
            </a>

            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Bagikan</p>
              <div className="flex gap-2 text-gray-500">
                <a href="#"><Facebook size={18} /></a>
                <a href="#"><Twitter size={18} /></a>
                <a href="#"><Instagram size={18} /></a>
                <a href="#"><Youtube size={18} /></a>
                <a href="#"><Linkedin size={18} /></a>
                <a href="#"><MessageSquareText size={18} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
