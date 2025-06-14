const statistikData = {
  "2024 - Semester 1": {
    "RW 1": {
      totalPenduduk: 400,
      kepalaKeluarga: 100,
      lakiLaki: 200,
      perempuan: 200,
      kelompokUmur: [
        { umur: '0-4', laki: 10, perempuan: 12 },
        { umur: '5-9', laki: 15, perempuan: 13 },
      ],
      dusun: [
        { nama: "Dusun A", persentase: 60 },
        { nama: "Dusun B", persentase: 40 },
      ],
      pendidikan: {
        "Tidak/Belum Sekolah": 10,
        SD: 20,
        SMA: 15,
      },
      pekerjaan: [
        { nama: "Petani", jumlah: 25 },
        { nama: "Guru", jumlah: 5 },
      ],
      perkawinan: [
        { status: "Kawin", jumlah: 200 },
        { status: "Belum Kawin", jumlah: 150 },
        { status: "Cerai", jumlah: 50 },
      ],
    },
    "RW 2": {
      // data RW 2 di sini, kamu bisa sesuaikan
    },
    // Tambah sampai RW 12
  },

  // Tambahkan Semester Lain
};

export default statistikData;
