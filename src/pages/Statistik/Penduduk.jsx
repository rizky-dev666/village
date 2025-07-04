// src/pages/Statistik/Penduduk.jsx

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Import Charts - Path sudah diperbaiki
import PiramidaPendudukChart from "../../components/charts/PiramidaPendudukChart";
import DusunChart from "../../components/charts/DusunChart";
import PendidikanChart from "../../components/charts/PendidikanChart";
import PerkawinanChart from "../../components/charts/PerkawinanChart";
import PekerjaanChart from "../../components/charts/PekerjaanChart";
import TernakChart from "../../components/TernakChart";
import BangunanChart from "../../components/BangunanChart";
import AgamaCards from "../../components/charts/AgamaCards";

// Import UI & Icons - Path sudah diperbaiki
import StatistikCard from "../../components/ui/StatistikCard";
import { FaUsers, FaHome, FaMale, FaFemale } from "react-icons/fa";

// Konfigurasi Leaflet Icon
const pinIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FitBounds({ domisili }) {
  const map = useMap();
  useEffect(() => {
    if (domisili.length > 0) {
      const bounds = domisili.map((item) => {
        const [lat, lng] = item.koordinat.split(",").map(Number);
        return [lat, lng];
      });
      if (
        bounds.every(
          (point) =>
            L.Util.isArray(point) &&
            point.length === 2 &&
            !isNaN(point[0]) &&
            !isNaN(point[1])
        )
      ) {
        map.fitBounds(bounds);
      }
    }
  }, [domisili, map]);
  return null;
}

const SectionWrapper = ({ title, children }) => (
  <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200">
    <h2 className="text-xl font-bold text-green-800 mb-4">{title}</h2>
    {children}
  </div>
);

export default function Penduduk() {
  const [domisili, setDomisili] = useState([]);
  const [tahunList, setTahunList] = useState([]);
  const [selectedTahun, setSelectedTahun] = useState("");
  const [selectedRT, setSelectedRT] = useState(null);
  const [statistik, setStatistik] = useState(null);
  const [semuaStatistik, setSemuaStatistik] = useState([]);

  // API Calls (tidak ada perubahan logika)
  const fetchDomisili = async () => {
    try {
      const res = await axios.get("/api/data-domisili");
      setDomisili(res.data);
    } catch (error) {
      console.error("Gagal mengambil data domisili:", error);
    }
  };

  const fetchTahunList = async () => {
    try {
      const res = await axios.get("/api/data-penduduk");
      const data = res.data;
      const unique = [...new Set(data.map((item) => item.tahun))].sort(
        (a, b) => b - a
      );
      setTahunList(unique);
      const currentYear = new Date().getFullYear().toString();
      const availableYear = unique.includes(currentYear)
        ? currentYear
        : unique[0];
      setSelectedTahun(availableYear || "");
      setSemuaStatistik(data);
    } catch (error) {
      console.error("Gagal mengambil data penduduk:", error);
    }
  };

  const fetchStatistik = (tahun, kode_sls, rt) => {
    const data = semuaStatistik.find(
      (item) =>
        item.tahun === tahun &&
        item.sls.kode_sls === kode_sls &&
        item.sls.rt === rt
    );
    setStatistik(data);
  };

  const getTotalStatistik = (tahun) => {
    const filtered = semuaStatistik.filter((item) => item.tahun === tahun);
    return filtered.reduce(
      (acc, curr) => ({
        perempuan: acc.perempuan + (curr.perempuan || 0),
        laki_laki: acc.laki_laki + (curr.laki_laki || 0),
        keluarga: acc.keluarga + (curr.keluarga || 0),
      }),
      { perempuan: 0, laki_laki: 0, keluarga: 0 }
    );
  };

  useEffect(() => {
    fetchDomisili();
    fetchTahunList();
  }, []);

  useEffect(() => {
    if (selectedTahun && selectedRT) {
      fetchStatistik(selectedTahun, selectedRT.kode_sls, selectedRT.rt);
    }
  }, [selectedTahun, selectedRT, semuaStatistik]);

  const displayedStatistik =
    selectedRT && statistik
      ? statistik
      : selectedTahun
      ? getTotalStatistik(selectedTahun)
      : null;

  const totalPenduduk = displayedStatistik
    ? displayedStatistik.perempuan + displayedStatistik.laki_laki
    : 0;

  const infoText = selectedRT
    ? `Menampilkan data untuk SLS ${selectedRT.kode_sls}, RT ${selectedRT.rt}. Klik penanda lain untuk mengubah.`
    : `Menampilkan data keseluruhan Desa Cikupa untuk tahun ${selectedTahun}. Klik penanda di peta untuk melihat detail RT.`;

  return (
    <div className="space-y-8 mt-6">
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h2 className="text-xl font-bold text-green-800">
            Peta Sebaran Desa
          </h2>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-500"
            value={selectedTahun}
            onChange={(e) => {
              setSelectedTahun(e.target.value);
              setSelectedRT(null);
              setStatistik(null);
            }}
          >
            {tahunList.length > 0 ? (
              tahunList.map((tahun, idx) => (
                <option key={idx} value={tahun}>
                  Tahun {tahun}
                </option>
              ))
            ) : (
              <option>Memuat tahun...</option>
            )}
          </select>
        </div>
        <div className="relative z-0 w-full h-[300px] md:h-[400px] bg-gray-100 rounded-lg overflow-hidden border-2 border-green-200">
          <MapContainer
            center={[-7.4, 108.1]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <FitBounds domisili={domisili} />
            {domisili.map((item, idx) => {
              const [lat, lng] = item.koordinat.split(",").map(Number);
              if (isNaN(lat) || isNaN(lng)) return null;
              return (
                <Marker
                  key={idx}
                  position={[lat, lng]}
                  icon={pinIcon}
                  eventHandlers={{ click: () => setSelectedRT(item) }}
                >
                  <Popup>
                    {" "}
                    RT {item.rt} / RW {item.rw}{" "}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
        <p className="mt-2 text-xs text-gray-600">{infoText}</p>
      </div>

      {displayedStatistik ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatistikCard
            title="Jumlah Penduduk"
            value={`${totalPenduduk.toLocaleString()} Jiwa`}
            icon={<FaUsers />}
          />
          <StatistikCard
            title="Jumlah Kepala Keluarga"
            value={`${(displayedStatistik.keluarga || 0).toLocaleString()} KK`}
            icon={<FaHome />}
          />
          <StatistikCard
            title="Jumlah Laki-laki"
            value={`${(
              displayedStatistik.laki_laki || 0
            ).toLocaleString()} Jiwa`}
            icon={<FaMale />}
          />
          <StatistikCard
            title="Jumlah Perempuan"
            value={`${(
              displayedStatistik.perempuan || 0
            ).toLocaleString()} Jiwa`}
            icon={<FaFemale />}
          />
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">
          Pilih tahun dan/atau klik peta untuk melihat data.
        </p>
      )}

      {selectedTahun && (
        <>
          <SectionWrapper title="Berdasarkan Kelompok Umur">
            <PiramidaPendudukChart tahun={selectedTahun} />
          </SectionWrapper>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SectionWrapper title="Berdasarkan Dusun">
              <DusunChart tahun={selectedTahun} />
            </SectionWrapper>
            <SectionWrapper title="Berdasarkan Pendidikan">
              <PendidikanChart
                tahun={selectedTahun}
                sls={selectedRT?.kode_sls}
              />
            </SectionWrapper>
            <SectionWrapper title="Berdasarkan Pekerjaan">
              <PekerjaanChart tahun={selectedTahun} />
            </SectionWrapper>
            <SectionWrapper title="Berdasarkan Perkawinan">
              <PerkawinanChart
                tahun={selectedTahun}
                kode_sls={selectedRT?.kode_sls}
              />
            </SectionWrapper>
            <SectionWrapper title="Berdasarkan Kepemilikan Ternak">
              <TernakChart
                tahun={selectedTahun}
                kode_sls={selectedRT?.kode_sls}
              />
            </SectionWrapper>
            <SectionWrapper title="Berdasarkan Kepemilikan Bangunan">
              <BangunanChart
                tahun={selectedTahun}
                kode_sls={selectedRT?.kode_sls}
              />
            </SectionWrapper>
          </div>

          <SectionWrapper title="Berdasarkan Agama">
            <AgamaCards tahun={selectedTahun} kode_sls={selectedRT?.kode_sls} />
          </SectionWrapper>
        </>
      )}
    </div>
  );
}
