const dataPembiayaan = [
  {
    tahun: "2024",
    rincian: {
      penerimaanPembiayaan: [
        { sumber: "Sisa Lebih Perhitungan Anggaran (SiLPA)", jumlah: 100000000 },
        { sumber: "Pencairan Dana Cadangan", jumlah: 50000000 },
      ],
      pengeluaranPembiayaan: [],
    },
  },
  {
    tahun: "2023",
    rincian: {
      penerimaanPembiayaan: [
        { sumber: "SiLPA", jumlah: 80000000 },
        { sumber: "Pinjaman Daerah", jumlah: 40000000 },
      ],
      pengeluaranPembiayaan: [
        { sumber: "Pembentukan Dana Cadangan", jumlah: 20000000 },
      ],
    },
  },
  {
    tahun: "2022",
    rincian: {
      penerimaanPembiayaan: [
        { sumber: "SiLPA", jumlah: 70000001 },
        { sumber: "Hasil Penjualan Kekayaan Desa", jumlah: 30000000 },
      ],
      pengeluaranPembiayaan: [
        { sumber: "Penyertaan Modal BUMDes", jumlah: 10000000 },
      ],
    },
  },
];

export default dataPembiayaan;
