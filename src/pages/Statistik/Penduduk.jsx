import { useEffect, useState,useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import PiramidaPendudukChart from "../../components/charts/PiramidaPendudukChart";
import DusunChart from "../../components/charts/DusunChart";
import PendidikanChart from "../../components/charts/PendidikanChart";
import PerkawinanChart from "../../components/charts/PerkawinanChart";
import AgamaChart from "../../components/charts/AgamaChart";
import PekerjaanChart from "../../components/charts/PekerjaanChart";
import TernakChart from "../../components/TernakChart";
import BangunanChart from "../../components/BangunanChart";

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
      map.fitBounds(bounds);
    }
  }, [domisili, map]);

  return null;
}


export default function Penduduk() {
  const [domisili, setDomisili] = useState([]);
  const [tahunList, setTahunList] = useState([]);
  const [selectedTahun, setSelectedTahun] = useState("");
  const [selectedRT, setSelectedRT] = useState(null);
  const [statistik, setStatistik] = useState(null);
  const [semuaStatistik, setSemuaStatistik] = useState([]);

  // API CALL
  const fetchDomisili = async () => {
    const res = await axios.get("/api/data-domisili");
    setDomisili(res.data);
  };

  const fetchTahunList = async () => {
    const res = await axios.get("/api/data-penduduk");
    const data = res.data;
    const unique = [...new Set(data.map((item) => item.tahun))];
    setTahunList(unique);

    const currentYear = new Date().getFullYear().toString();
    const availableYear = unique.includes(currentYear)
      ? currentYear
      : unique[0];
    setSelectedTahun(availableYear);
    setSemuaStatistik(data);
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

  const getTotalStatistik = () => {
    const filtered = semuaStatistik.filter(
      (item) => item.tahun === selectedTahun
    );
    return filtered.reduce(
      (acc, curr) => ({
        perempuan: acc.perempuan + curr.perempuan,
        laki_laki: acc.laki_laki + curr.laki_laki,
        keluarga: acc.keluarga + curr.keluarga,
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
  }, [selectedTahun, selectedRT]);

  const displayedStatistik =
    selectedRT && statistik
      ? statistik
      : selectedTahun
      ? getTotalStatistik()
      : null;

  const judul = selectedRT
    ? `📍 Data untuk SLS ${selectedRT.kode_sls} RT ${selectedRT.rt}`
    : selectedTahun
    ? "📊 Data semua di desa"
    : "";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Statistik Penduduk</h1>

      <select
        className="mb-4 p-2 border"
        value={selectedTahun}
        onChange={(e) => {
          setSelectedTahun(e.target.value);
          setSelectedRT(null);
          setStatistik(null);
        }}
      >
        <option value="">Pilih Tahun</option>
        {tahunList.map((tahun, idx) => (
          <option key={idx} value={tahun}>
            {tahun}
          </option>
        ))}
      </select>

<MapContainer
  center={[-7.2575, 112.7521]} // ini tidak masalah, nanti di-override oleh fitBounds
  zoom={13}
  style={{ height: "400px", width: "100%" }}
>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <FitBounds domisili={domisili} />

  {domisili.map((item, idx) => {
    const [lat, lng] = item.koordinat.split(",").map(Number);
    return (
      <Marker
        key={idx}
        position={[lat, lng]}
        icon={pinIcon}
        eventHandlers={{
          click: () => setSelectedRT(item),
        }}
      >
        <Popup>
          RT {item.rt} / RW {item.rw}
        </Popup>
      </Marker>
    );
  })}
</MapContainer>


      {displayedStatistik ? (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">{judul}</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-100 rounded">
              👩 Perempuan: {displayedStatistik.perempuan}
            </div>
            <div className="p-4 bg-green-100 rounded">
              👨 Laki-laki: {displayedStatistik.laki_laki}
            </div>
            <div className="p-4 bg-yellow-100 rounded">
              🏠 Keluarga: {displayedStatistik.keluarga}
            </div>
            <div className="p-4 bg-purple-100 rounded">
              👥 Total Penduduk:{" "}
              {displayedStatistik.perempuan + displayedStatistik.laki_laki}
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-4">Pilih tahun untuk melihat data penduduk.</p>
      )}

      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg mt-2 p-4 border">
        <PiramidaPendudukChart tahun={selectedTahun} />
      </div>
       <div className="grid md:grid-cols-1 gap-8">
        {/* ... Grafik Dusun, Pendidikan, Pekerjaan, Perkawinan ... */}
        <div>
          Berdasarkan Dusun
          <div className="bg-white rounded-2xl shadow mt-2 p-4 h-[340px] flex items-center justify-center">
            <DusunChart tahun={selectedTahun} />
          </div>
        </div>
        <div>
          Pendidikan
          <div className="bg-white rounded-2xl shadow mt-2 p-4 h-[340px] flex items-center justify-center">
            <PendidikanChart
  tahun={selectedTahun}
  sls={selectedRT?.kode_sls}
/>

          </div>
          <div>
          Berdasarkan Perkawinan 
          <div className="bg-white rounded-2xl shadow mt-2 p-4 h-[340px]">
            <PerkawinanChart tahun={selectedTahun} kode_sls={selectedRT?.kode_sls} />

          </div>
        </div>
        </div>
        <div>
         Berdasarkan pekerjaan 
          <div className="bg-white rounded-2xl shadow mt-2 p-4 h-[340px]">
            <PekerjaanChart tahun={selectedTahun}   />
          </div>
        </div>
        <div>
         Berdasarkan ternak 
          <div className="bg-white rounded-2xl shadow mt-2 p-4 h-[340px]">
            <TernakChart tahun={selectedTahun} kode_sls={selectedRT?.kode_sls} />
          </div>
        </div>
        <div>
         Berdasarkan bangunan 
          <div className="bg-white rounded-2xl shadow mt-2 p-4 h-[340px]">
            <BangunanChart tahun={selectedTahun} kode_sls={selectedRT?.kode_sls} />
          </div>
        </div>
          <div>
          Berdasarkan Agama 
          <div className="bg-white rounded-2xl shadow mt-2 p-4 h-[340px]">
            <AgamaChart tahun={selectedTahun} kode_sls={selectedRT?.kode_sls} />

          </div>
        </div>
        </div>
    </div>
  );
}
