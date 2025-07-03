import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import axios from "axios";

const desaId = "273174c3-fdd6-450e-a1bd-ebfe052d5aae";

export default function Footer() {
  const [kontak, setKontak] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKontak = async () => {
      try {
        const response = await axios.get(`/api/desa/${desaId}`);
        setKontak(response.data);
      } catch (err) {
        console.error("Gagal memuat data footer:", err);
        setError("Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    };

    fetchKontak();
  }, []);

  if (loading) return <footer className="p-6 text-center">Memuat data footer...</footer>;
  if (error || !kontak) return <footer className="p-6 text-center text-red-500">{error || "Data tidak ditemukan"}</footer>;

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-6 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8">
        {/* Kolom 1: Logo & Info Desa */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              src={kontak.logo_desa || "/src/assets/logo.png"}
              alt="Logo Desa"
              className="w-20 h-20 object-contain"
            />
            <div>
              <h2 className="text-2xl font-bold text-green-700">{kontak.nama_desa || "Desa"}</h2>
              <p className="text-green-800 leading-tight">Kabupaten Tasikmalaya</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-gray-500 text-xl pl-0 md:pl-24">
            <a href="https://facebook.com/desacikupa" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://twitter.com/desacikupa" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com/desacikupa" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://linkedin.com/company/desacikupa" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="https://youtube.com/@desacikupa" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        {/* Kolom 2-4: Placeholder Link */}
        {["Product", "Company", "Support"].map((title, i) => (
          <div key={i}>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <ul className="mt-4 space-y-2 text-gray-500">
              {Array(5).fill().map((_, j) => <li key={j}><a href="#">Lorem Ipsum</a></li>)}
            </ul>
          </div>
        ))}

        {/* Kolom 5: Kontak dari Supabase */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
          <ul className="mt-4 space-y-3 text-gray-500 text-sm">
            {kontak.email_desa && (
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-base mt-1" />
                <span>{kontak.email_desa}</span>
              </li>
            )}
            {kontak.tlp_desa && (
              <li className="flex items-start gap-3">
                <FaPhone className="text-base mt-1" />
                <span>{kontak.tlp_desa}</span>
              </li>
            )}
            {kontak.alamat_kantor_desa && (
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-base mt-1" />
                <span>{kontak.alamat_kantor_desa}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-center">Copyright © 2025 {kontak.nama_desa}</p>
        <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
          <a href="#" className="hover:underline">Terms and Conditions</a>
          <span className="hidden sm:inline-block">|</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
