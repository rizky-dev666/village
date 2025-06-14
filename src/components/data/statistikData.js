// Fungsi untuk menghasilkan angka acak dalam rentang tertentu
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Fungsi untuk membuat data dummy yang kaya untuk satu RW
const generateRWData = () => {
  const laki = random(150, 2000);
  const perempuan = random(150, 2000);
  const totalPenduduk = laki + perempuan;

  const kawin = random(
    Math.floor(totalPenduduk * 0.5),
    Math.floor(totalPenduduk * 0.7)
  );
  const cerai = random(10, 100);
  const belumKawin = totalPenduduk - kawin - cerai;

  const islam = random(
    Math.floor(totalPenduduk * 0.85),
    Math.floor(totalPenduduk * 0.98)
  );
  const sisaPenduduk = totalPenduduk - islam;
  const kristen = random(
    Math.floor(sisaPenduduk * 0.4),
    Math.floor(sisaPenduduk * 0.6)
  );
  const sisaLainnya = sisaPenduduk - kristen;
  const hindu = Math.floor(sisaLainnya / 3);
  const buddha = Math.floor(sisaLainnya / 3);
  const konghucu = sisaLainnya - hindu - buddha;

  return {
    totalPenduduk,
    kepalaKeluarga: random(80, 500),
    lakiLaki: laki,
    perempuan: perempuan,
    kelompokUmur: [
      { umur: "0-4 Tahun", laki: random(10, 200), perempuan: random(10, 200) },
      { umur: "5-9 Tahun", laki: random(15, 250), perempuan: random(15, 250) },
      {
        umur: "10-14 Tahun",
        laki: random(18, 280),
        perempuan: random(18, 280),
      },
      {
        umur: "15-19 Tahun",
        laki: random(20, 300),
        perempuan: random(20, 300),
      },
      {
        umur: "20-59 Tahun",
        laki: random(80, 1000),
        perempuan: random(80, 1000),
      },
      { umur: "60+ Tahun", laki: random(5, 150), perempuan: random(40, 200) },
    ],
    dusun: [
      {
        nama: `Dusun ${["Mawar", "Melati", "Anggrek"][random(0, 2)]}`,
        value: random(80, 1500),
      },
      {
        nama: `Dusun ${["Kamboja", "Cempaka", "Dahlia"][random(0, 2)]}`,
        value: random(70, 1200),
      },
      { nama: "Dusun Sejahtera", value: random(50, 1000) },
    ],
    pendidikan: {
      "Tidak/Belum Sekolah": random(20, 200),
      "SD Sederajat": random(100, 1500),
      "SMP Sederajat": random(80, 1200),
      "SMA Sederajat": random(70, 1000),
      "Diploma/Sarjana": random(30, 600),
    },
    pekerjaan: [
      { nama: "Petani/Buruh Tani", jumlah: random(80, 1200) },
      { nama: "Wiraswasta", jumlah: random(40, 700) },
      { nama: "Karyawan Swasta", jumlah: random(30, 600) },
      { nama: "PNS/TNI/Polri", jumlah: random(10, 250) },
      { nama: "Pelajar/Mahasiswa", jumlah: random(50, 800) },
      { nama: "Lainnya", jumlah: random(20, 400) },
    ],
    perkawinan: [
      { status: "Kawin", jumlah: kawin },
      { status: "Belum Kawin", jumlah: belumKawin > 0 ? belumKawin : 0 },
      { status: "Cerai", jumlah: cerai },
    ],
    agama: [
      { nama: "Islam", jumlah: islam },
      { nama: "Kristen", jumlah: kristen },
      { nama: "Hindu", jumlah: hindu > 0 ? hindu : 0 },
      { nama: "Buddha", jumlah: buddha > 0 ? buddha : 0 },
      { nama: "Konghucu", jumlah: konghucu > 0 ? konghucu : 0 },
    ],
  };
};

const generatePeriodData = () => {
  const periodData = {};
  for (let i = 1; i <= 12; i++) {
    periodData[`RW ${i}`] = generateRWData();
  }
  return periodData;
};

// --- FUNGSI evolveData YANG DIPERBAIKI ---
const evolveData = (previousPeriodData) => {
  const newPeriodData = JSON.parse(JSON.stringify(previousPeriodData));

  for (const rw in newPeriodData) {
    const data = newPeriodData[rw];
    const growth = 1 + random(0, 20) / 1000; // Pertumbuhan acak 0% - 2%

    // Tumbuhkan data utama
    data.totalPenduduk = Math.floor(data.totalPenduduk * growth);
    data.lakiLaki = Math.floor(data.lakiLaki * growth);
    data.perempuan = data.totalPenduduk - data.lakiLaki;
    data.kepalaKeluarga = Math.floor(
      data.kepalaKeluarga * (1 + random(0, 10) / 1000)
    );

    // Tumbuhkan juga SEMUA data rincian agar konsisten
    data.kelompokUmur.forEach((g) => {
      g.laki = Math.floor(g.laki * growth);
      g.perempuan = Math.floor(g.perempuan * growth);
    });
    data.dusun.forEach((d) => {
      d.value = Math.floor(d.value * growth);
    });
    Object.keys(data.pendidikan).forEach((k) => {
      data.pendidikan[k] = Math.floor(data.pendidikan[k] * growth);
    });
    data.pekerjaan.forEach((p) => {
      p.jumlah = Math.floor(p.jumlah * growth);
    });
    data.perkawinan.forEach((p) => {
      p.jumlah = Math.floor(p.jumlah * growth);
    });
    data.agama.forEach((a) => {
      a.jumlah = Math.floor(a.jumlah * growth);
    });
  }
  return newPeriodData;
};

// --- Sisa file tetap sama ---
const periods = [
  "2023 - Semester 1",
  "2023 - Semester 2",
  "2024 - Semester 1",
  "2024 - Semester 2",
  "2025 - Semester 1",
];

const statistikData = {};
statistikData[periods[0]] = generatePeriodData();

for (let i = 1; i < periods.length; i++) {
  const previousPeriodName = periods[i - 1];
  const currentPeriodName = periods[i];
  statistikData[currentPeriodName] = evolveData(
    statistikData[previousPeriodName]
  );
}

export default statistikData;
