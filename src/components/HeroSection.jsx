import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const HeroSection = () => {
  const [heroImages, setHeroImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get("/api/banner", {
          withCredentials: true,
        });

        const aktif = res.data.filter((item) => item.tampilkan === true);
        setHeroImages(aktif.map((item) => item.gambar_banner));
      } catch (error) {
        console.error("Gagal mengambil data banner:", error);
      }
    };

    fetchBanner();
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  if (heroImages.length === 0) {
    return (
      <section className="flex items-center justify-center h-[80vh] md:h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Memuat gambar banner...</p>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[80vh] md:h-screen overflow-hidden">
      {/* Gambar background */}
      <img
        src={heroImages[currentSlide]}
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Teks di atas gambar */}
      <div className="absolute inset-0 flex items-center justify-start z-10 px-4 sm:px-8 md:px-20">
        <div className="max-w-xl text-left text-white space-y-3 p-4 md:p-6 rounded-md">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold drop-shadow-lg">
            Selamat Datang di
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold drop-shadow-lg">
            Website Resmi Desa Cikupa
          </h2>
        </div>
      </div>

      {/* Tombol navigasi slide */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        <button
          onClick={prevSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-700 text-white flex items-center justify-center border border-white hover:bg-green-800"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-700 text-white flex items-center justify-center border border-white hover:bg-green-800"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
