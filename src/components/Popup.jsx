import React, { useEffect, useState } from "react";
import axios from "axios";

const Popup = ({ setPopupSudahTampil }) => {
  const [showPopup, setShowPopup] = useState(true);
  const [gambarList, setGambarList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ambil data popup dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/popup");
        setGambarList(res.data);
      } catch (err) {
        console.error("Gagal mengambil data popup:", err);
      }
    };

    fetchData();
  }, []);

  // Auto slide
  useEffect(() => {
    if (gambarList.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === gambarList.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [gambarList]);

  const closePopup = () => {
    setShowPopup(false);
    setPopupSudahTampil(true);
  };

  const nextSlide = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === gambarList.length - 1 ? 0 : prevIndex + 1
    );

  const prevSlide = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? gambarList.length - 1 : prevIndex - 1
    );

  if (!showPopup || gambarList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden max-w-md w-full">
        {/* Tombol Close */}
        <button
          className="absolute top-3 right-3 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold"
          onClick={closePopup}
        >
          ×
        </button>

        {/* Tombol kiri */}
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold"
          onClick={prevSlide}
        >
          ‹
        </button>

        {/* Tombol kanan */}
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold"
          onClick={nextSlide}
        >
          ›
        </button>

        {/* Gambar dari backend */}
        <img
          src={gambarList[currentIndex]?.gambar_popup}
          alt={`Popup ${currentIndex + 1}`}
          className="w-full h-[400px] object-cover"
        />
      </div>
    </div>
  );
};

export default Popup;
