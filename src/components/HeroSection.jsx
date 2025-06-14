import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // pastikan sudah install

const heroImages = [
  "/assets/hero1.png",
  "/assets/hero2.png",
  "/assets/hero3.png",
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[80vh] md:h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImages[currentSlide]}
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Teks di kiri */}
      <div className="absolute inset-0 flex items-center justify-start z-10 px-4 sm:px-8 md:px-20">
        <div className="max-w-xl text-left text-white space-y-3 md:bg-transparent p-4 md:p-0 rounded-md">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold drop-shadow-lg">
            Selamat Datang di
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold drop-shadow-lg">
            Website Resmi Desa Cikupa
          </h2>
          <p className="text-base sm:text-lg md:text-xl drop-shadow-lg">
            Sumber informasi tentang Desa Cikupa
          </p>
        </div>
      </div>

      {/* Tombol Navigasi */}
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
