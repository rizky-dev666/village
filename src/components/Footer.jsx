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

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-6 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8">
        {/* Kolom 1: Logo & Info Desa */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/src/assets/logo.png"
              alt="Logo Desa Cikupa"
              className="w-20 h-20 object-contain"
            />
            <div>
              <h2 className="text-2xl font-bold text-green-700">Desa Cikupa</h2>
              <p className="text-green-800 leading-tight">
                Kabupaten Tasikmalaya
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-gray-500 text-xl pl-0 md:pl-24">
            <a
              href="https://facebook.com/desacikupa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/desacikupa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/desacikupa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/company/desacikupa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://youtube.com/@desacikupa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Kolom 2: Product */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Product</h3>
          <ul className="mt-4 space-y-2 text-gray-500">
            <li><a href="#">Lorem Ipsum</a></li>
            <li><a href="#">Lorem Ipsum</a></li>
            <li><a href="#">Lorem Ipsum</a></li>
            <li><a href="#">Lorem Ipsum</a></li>
            <li><a href="#">Lorem Ipsum</a></li>
          </ul>
        </div>

        {/* Kolom 3: Company */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Company</h3>
          <ul className="mt-4 space-y-2 text-gray-500">
            <li><a href="#">Lorem Ipsum</a></li>
            <li><a href="#">Lorem Ipsum</a></li>
            <li><a href="#">Lorem Ipsum</a></li>
            <li><a href="#">Lorem Ipsum</a></li>
            <li><a href="#">Lorem Ipsum</a></li>
          </ul>
        </div>

        {/* Kolom 4: Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Support</h3>
          <ul className="mt-4 space-y-2 text-gray-500">
            <li><a href="#">Lorem Ipsum</a></li>
            <li><a href="#">Lorem Ipsum</a></li>
            <li><a href="#">Lorem Ipsum</a></li>
            <li><a href="#">Lorem Ipsum</a></li>
            <li><a href="#">Lorem Ipsum</a></li>
          </ul>
        </div>

        {/* Kolom 5: Kontak */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
          <ul className="mt-4 space-y-3 text-gray-500 text-sm">
            <li className="flex items-start gap-3">
              <FaEnvelope className="text-base mt-1" />
              <span>contact@desacikupa.id</span>
            </li>
            <li className="flex items-start gap-3">
              <FaPhone className="text-base mt-1" />
              <span>(0265) 687 – 1234</span>
            </li>
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-base mt-1" />
              <span>
                Jl. Raya Cikupa No.1<br />
                Tasikmalaya, Jawa Barat
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-center">Copyright © 2025 Desa Cikupa</p>
        <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
          <a href="#" className="hover:underline">Terms and Conditions</a>
          <span className="hidden sm:inline-block">|</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
