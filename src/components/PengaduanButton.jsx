import React, { useState } from "react";
import { X, Headphones, Upload } from "lucide-react";

const PengaduanButton = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    whatsapp: "",
    kategori: "",
    pengaduan: "",
    lampiran: null,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const togglePopup = () => {
    setOpen(!open);
    setErrors({});
    setSubmitted(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nama.trim()) newErrors.nama = "Mohon masukkan nama.";
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "Mohon masukkan nomor telepon.";
    } else if (!/^\d+$/.test(formData.whatsapp.trim())) {
      newErrors.whatsapp = "Nomor telepon hanya boleh berupa angka.";
    }
    if (!formData.kategori.trim()) newErrors.kategori = "Mohon pilih kategori pengaduan.";
    if (!formData.pengaduan.trim()) newErrors.pengaduan = "Mohon masukkan detail pengaduan.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validateForm()) return;

    console.log("Data dikirim:", formData);
    // Kirim ke backend jika sudah tersedia

    setFormData({
      nama: "",
      whatsapp: "",
      kategori: "",
      pengaduan: "",
      lampiran: null,
    });
    setOpen(false);
    setSubmitted(false);
  };

  return (
    <>
      {/* Tombol Trigger */}
      <button
        onClick={togglePopup}
        className="fixed bottom-6 right-4 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg"
      >
        <Headphones className="w-4 h-4" />
        <span className="text-sm font-medium">Pengaduan</span>
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed bottom-20 right-4 z-50 w-96 bg-white shadow-xl rounded-lg border border-gray-200 p-6">
          {/* Tombol Close */}
          <button
            onClick={togglePopup}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Pesan error umum */}
          {submitted && Object.keys(errors).length > 0 && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
              Mohon lengkapi semua data dengan benar.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama */}
            <div>
              <label className="text-sm font-medium">Nama <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Masukkan Nama Anda"
                className={`w-full mt-1 px-3 py-2 text-sm text-gray-700 bg-gray-300 rounded outline-none placeholder:text-gray-600 ${
                  errors.nama && "border border-red-500"
                }`}
              />
              {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
            </div>

            {/* Whatsapp */}
            <div>
              <label className="text-sm font-medium">No Telp/Whatsapp <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="whatsapp"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="Masukkan No Telp/Whatsapp"
                className={`w-full mt-1 px-3 py-2 text-sm text-gray-700 bg-gray-300 rounded outline-none placeholder:text-gray-600 ${
                  errors.whatsapp && "border border-red-500"
                }`}
              />
              {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
            </div>

            {/* Kategori */}
            <div>
              <label className="text-sm font-medium">Kategori Pengaduan <span className="text-red-500">*</span></label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className={`w-full mt-1 px-3 py-2 text-sm text-gray-700 bg-gray-300 rounded outline-none ${
                  errors.kategori && "border border-red-500"
                }`}
              >
                <option value="">Pilih Kategori Pengaduan</option>
                <option value="Layanan">Layanan</option>
                <option value="Infrastruktur">Infrastruktur</option>
                <option value="Keamanan">Keamanan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              {errors.kategori && <p className="text-red-500 text-xs mt-1">{errors.kategori}</p>}
            </div>

            {/* Pengaduan */}
            <div>
              <label className="text-sm font-medium">Pengaduan <span className="text-red-500">*</span></label>
              <textarea
                name="pengaduan"
                value={formData.pengaduan}
                onChange={handleChange}
                placeholder="Masukkan Detail Pengaduan Anda"
                className={`w-full mt-1 px-3 py-2 text-sm text-gray-700 bg-gray-300 rounded outline-none resize-none placeholder:text-gray-600 ${
                  errors.pengaduan && "border border-red-500"
                }`}
                rows={4}
              />
              {errors.pengaduan && <p className="text-red-500 text-xs mt-1">{errors.pengaduan}</p>}
            </div>

            {/* Lampiran */}
            <div>
              <label className="text-sm font-medium">Lampiran</label>
              <label className="flex items-center justify-between mt-1 bg-gray-300 text-gray-600 text-sm px-3 py-2 rounded cursor-pointer">
                <span>{formData.lampiran ? formData.lampiran.name : "Tambahkan Lampiran Jika Ada"}</span>
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  name="lampiran"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Tombol Submit */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2"
              >
                Kirim <Upload className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default PengaduanButton;
