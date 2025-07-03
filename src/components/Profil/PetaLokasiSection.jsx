import React, { useEffect, useState } from "react";
import axios from "axios";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PetaLokasiSection = () => {
  const [data, setData] = useState(null);
  const [penduduk, setPenduduk] = useState([]);
  const [jumlahPenduduk, setJumlahPenduduk] = useState(0);

  const lokasiId = "f91cd017-c338-48aa-b68e-f8ac96367762";

  useEffect(() => {
    const fetchLokasi = async () => {
      try {
        const response = await axios.get(`/api/lokasi-desa/${lokasiId}`);
        const data = response.data;
        setData({
          link_gmaps: data.link_gmaps,
          luas_desa: data.luas_desa,
          batas_barat: data.batas_barat,
          batas_timur: data.batas_timur,
          batas_utara: data.batas_utara,
          batas_selatan: data.batas_selatan,
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchLokasi();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/data-penduduk");
        setPenduduk(res.data);

        const tahunSekarang = new Date().getFullYear();
        const dataTahunIni = res.data.find(
          (item) => parseInt(item.tahun) === tahunSekarang
        );

        if (dataTahunIni) {
          const jumlah =
            (parseInt(dataTahunIni.laki_laki) || 0) +
            (parseInt(dataTahunIni.perempuan) || 0);
          setJumlahPenduduk(jumlah);
        } else {
          console.warn("Data untuk tahun ini tidak ditemukan.");
        }
      } catch (error) {
        console.error("Gagal mengambil data penduduk", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="w-full py-12 px-4 md:px-6 bg-[#F7F7F7]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[#2E7D32] text-2xl md:text-3xl font-extrabold mb-1 text-left">
          Peta Lokasi
        </h2>
        <p className="text-sm md:text-base font-medium mb-6 text-left">
          Letak Peta Lokasi Desa Cikupa
        </p>

        {data ? (
          <div className="flex flex-col-reverse md:flex-row gap-6">
            <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 w-full md:w-1/2 space-y-3 text-sm md:text-base">
              <div>
                <p className="font-semibold">Batas Desa :</p>
                <p>Utara : {data.batas_utara}</p>
                <p>Selatan : {data.batas_selatan}</p>
                <p>Barat : {data.batas_barat}</p>
                <p>Timur : {data.batas_timur}</p>
              </div>
              <hr />
              <div>
                <p className="font-semibold">Luas Desa :</p>
                <p>
                  {data.luas_desa}
                  {!`${data.luas_desa}`.includes("m²") && " m²"}
                </p>
              </div>
              <hr />
              <div>
                <h2 className="font-semibold mb-2">
                  Jumlah Penduduk Tahun {new Date().getFullYear()}:
                </h2>
                <p className="">{jumlahPenduduk.toLocaleString()} jiwa</p>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              {data.link_gmaps?.includes("google.com/maps/embed") ? (
                <div
                  className="relative h-0 overflow-hidden border-gray-300 rounded-lg shadow-md w-full"
                  style={{ paddingBottom: "70%" }} // Peta lebih besar
                >
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={data.link_gmaps}
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex="0"
                    title="Google Map"
                  ></iframe>
                </div>
              ) : (
                <Skeleton height={300} borderRadius={16} className="mb-6" />
              )}
            </div>
          </div>
        ) : (
          <p>Memuat data lokasi desa...</p>
        )}
      </div>
    </section>
  );
};

export default PetaLokasiSection;
