import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEye,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaHome,
} from "react-icons/fa";

const formatTanggal = (isoString) => {
  return new Date(isoString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const IsiBerita = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dariHome = location.state?.fromHome;

  const [berita, setBerita] = useState(null);
  const [views, setViews] = useState(0);
  const [beritaLainnya, setBeritaLainnya] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await axios.get(`/api/berita/${id}`);
        const data = res.data;

        setBerita({ ...data, dilihat: data.dilihat + 1 });
        setViews(data.dilihat + 1);

        // Tambahkan logika untuk update view count
        await axios.post(`/api/berita/${id}/view`);

        // Ambil berita lainnya
        const resLainnya = await axios.get(`/api/berita`);
        const lainnya = resLainnya.data
          .filter((b) => b.id_berita !== parseInt(id))
          .sort((a, b) => b.id_berita - a.id_berita)
          .slice(0, 6);

        setBeritaLainnya(lainnya);
      } catch (error) {
        console.error("Gagal memuat data berita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [id]);

  if (loading) return <p>Memuat data...</p>;
  if (!berita) return <p>Berita tidak ditemukan.</p>;

  const shareUrl = window.location.href;
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(berita.judul_berita)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(berita.judul_berita + " " + shareUrl)}`,
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 bg-[#f7f7f7]">
      {/* Konten Berita */}
      <div className="w-full lg:w-3/4">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <Link
              to={dariHome ? "/" : "/berita"}
              className="flex items-center text-sm text-gray-600 hover:underline gap-2"
            >
              <FaHome />
              <span>{dariHome ? "/ Beranda" : "/ Berita Desa Cikupa"}</span>
            </Link>

            <button
              onClick={() => navigate(dariHome ? "/" : "/berita")}
              className="text-green-600 text-sm hover:underline"
            >
              ← Kembali
            </button>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
            {berita.judul_berita}
          </h1>

          <div className="text-xs sm:text-sm text-gray-500 flex flex-wrap gap-4 mb-4">
            <span className="flex items-center gap-1">
              <FaUser /> {berita.penulis_berita}
            </span>
            <span>{formatTanggal(berita.created_at)}</span>
            <span className="flex items-center gap-1">
              <FaEye /> {views} Kali
            </span>
          </div>

          <img
            src={berita.gambar_berita}
            alt={berita.judul_berita}
            className="w-full h-48 sm:h-80 object-cover mb-6 rounded-md"
          />

          <div className="text-gray-700 leading-relaxed space-y-4 mb-6 text-sm sm:text-base">
            {(Array.isArray(berita.isi_berita)
              ? berita.isi_berita
              : berita.isi_berita.split("\n")
            ).map((paragraf, index) => (
              <p key={index}>{paragraf}</p>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Bagikan</h4>
            <div className="flex gap-4">
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                <FaFacebookF />
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="bg-sky-400 text-white p-2 rounded hover:bg-sky-500"
              >
                <FaTwitter />
              </a>
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Berita Terbaru */}
      <div className="w-full lg:w-1/4">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-base sm:text-lg font-semibold mb-4">
            Berita Terbaru
          </h3>
          <div className="space-y-4">
            {beritaLainnya.map((b) => (
              <Link
                to={`/berita/${b.id_berita}`}
                key={b.id_berita}
                className="flex gap-4 items-start hover:bg-gray-50 p-2 rounded"
              >
                <img
                  src={b.gambar_berita}
                  alt={b.judul_berita}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 hover:text-green-600">
                    {b.judul_berita.length > 40
                      ? b.judul_berita.slice(0, 40) + "..."
                      : b.judul_berita}
                  </p>
                  <div className="text-xs text-gray-500 flex gap-2 mt-1 flex-wrap">
                    <span>{formatTanggal(b.created_at)}</span>
                    <span className="flex items-center gap-1">
                      <FaEye /> {b.dilihat}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsiBerita;
