const PetaSection = () => {
  return (
    <section className="px-4 py-8 md:px-20 bg-[#f7f7f7]">
      {/* Judul */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-green-700">Peta Desa</h2>
        <p className="text-gray-800">Menampilkan Peta Desa Cikupa</p>
      </div>

      {/* Map dengan border dan tinggi yang diperbaiki */}
      <div className="relative w-full h-[400px] md:h-[450px] rounded-lg overflow-hidden border-4 border-green-700">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38193.76042688794!2d108.09742515552078!3d-7.653166711288416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65e3d92bea53cb%3A0xb71e62318af2bb11!2sCikupa%2C%20Karangnunggal%2C%20Tasikmalaya%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1749784589394!5m2!1sen!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Peta Desa Cikupa"
        ></iframe>
      </div>
    </section>
  );
};

export default PetaSection;
