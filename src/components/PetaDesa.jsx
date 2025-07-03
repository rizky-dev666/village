import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Perbaikan ikon marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const centerPosition = [-7.6755, 108.139];

// Batas wilayah peta
const corner1 = L.latLng(-6.160320, 105.876246);
const corner2 = L.latLng(-6.208750, 106.818944);
const maxBounds = L.latLngBounds(corner1, corner2);

const PetaDesa = ({ setSelectedRW }) => {
  const [rwData, setRwData] = useState([]);

  useEffect(() => {
    const getRWData = async () => {
      try {
        const response = await axios.get("/api/data-domisili");
        const data = response.data;

        const formattedData = data.map((item, index) => {
          const [latStr, lngStr] = item.koordinat.split(","); // misal: "-7.655, 108.16"
          const lat = parseFloat(latStr);
          const lng = parseFloat(lngStr);
          return {
            id: item.kode_sls,
            nama: `RW ${item.rw} RT ${item.rt}`,
            posisi: [lat, lng],
          };
        });

        setRwData(formattedData);
      } catch (error) {
        console.error("Gagal mengambil data RW:", error);
      }
    };

    getRWData();
  }, []);
console.log(rwData)
  return (
    <MapContainer
      center={centerPosition}
      zoom={16}
      style={{ height: "100%", width: "100%" }}
      maxBounds={maxBounds}
      minZoom={15}
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
              setSelectedRW(rw.id);
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

export default PetaDesa;
