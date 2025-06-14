import React from 'react';
import fotoKades from '/assets/kades.jpg';

const SambutanSection = () => {
  return (
    <section className="bg-[#f7f7f7] py-12 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        
        {/* Foto Kepala Desa */}
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full border-[3px] border-green-700 overflow-hidden">
            <img
              src={fotoKades}
              alt="Kepala Desa"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Teks Sambutan */}
        <div className="flex-1 text-center md:text-left mt-6 md:mt-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-1">
            Sambutan Kepala Desa Cikupa
          </h2>
          <p className="text-base sm:text-lg font-bold text-black">Yudha Heryadhi</p>
          <p className="text-sm text-gray-800 mb-4">Kepala Desa Cikupa</p>

          <hr className="border border-gray-400 w-full mb-4" />

          <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed">
            <p>
              Selamat datang di <span className="font-semibold">Website Resmi Desa Cikupa</span>!
            </p>
            <p>
              Platform ini adalah jendela informasi desa kita. Temukan profil, berita,
              dan program pembangunan di sini. Mari kita bangun desa ini bersama.
              Terima kasih.
            </p>
            <div>
              <p>Hormat saya,</p>
              <div className="mt-6">
                <p className="font-bold text-black">Yudha Heryadhi</p>
                <p className="text-sm text-gray-800">Kepala Desa Cikupa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SambutanSection;
