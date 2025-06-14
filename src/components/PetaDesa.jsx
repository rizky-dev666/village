import React, { memo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Perbaikan untuk ikon marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const centerPosition = [-7.6755, 108.139];

// --- PERUBAHAN DIMULAI DI SINI ---

// 1. Tentukan Batas Wilayah Peta
// Ini adalah koordinat untuk sudut Barat Daya dan Timur Laut dari "kotak" batas.
const corner1 = L.latLng(-7.695, 108.12); // Sudut kiri bawah
const corner2 = L.latLng(-7.655, 108.16); // Sudut kanan atas
const maxBounds = L.latLngBounds(corner1, corner2);

// --- AKHIR DARI PERUBAHAN ---

const rwData = [
  { id: 1, nama: "RW 1", posisi: [-7.675, 108.138] },
  { id: 2, nama: "RW 2", posisi: [-7.6745, 108.1395] },
  { id: 3, nama: "RW 3", posisi: [-7.676, 108.1405] },
  { id: 4, nama: "RW 4", posisi: [-7.677, 108.139] },
  { id: 5, nama: "RW 5", posisi: [-7.6765, 108.1375] },
  { id: 6, nama: "RW 6", posisi: [-7.6735, 108.1365] },
  { id: 7, nama: "RW 7", posisi: [-7.678, 108.1415] },
  { id: 8, nama: "RW 8", posisi: [-7.674, 108.142] },
  { id: 9, nama: "RW 9", posisi: [-7.6725, 108.139] },
  { id: 10, nama: "RW 10", posisi: [-7.679, 108.1385] },
  { id: 11, nama: "RW 11", posisi: [-7.6758, 108.143] },
  { id: 12, nama: "RW 12", posisi: [-7.6775, 108.136] },
];

const PetaDesa = ({ setSelectedRW }) => {
  return (
    <MapContainer
      center={centerPosition}
      zoom={16}
      style={{ height: "100%", width: "100%" }}
      // --- PERUBAHAN DIMULAI DI SINI ---
      maxBounds={maxBounds} // 2. Terapkan batas wilayah
      minZoom={15} // 3. Terapkan batas zoom out
      // --- AKHIR DARI PERUBAHAN ---
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {rwData.map((rw) => (
        <Marker
          key={rw.id}
          position={rw.posisi}
          eventHandlers={{
            click: () => {
              setSelectedRW(rw.nama);
            },
          }}
        >
          <Popup>
            <b>{rw.nama}</b>
            <br />
            Desa Cikupa
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default memo(PetaDesa);
