import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import StatistikMenu from "../components/statistikMenu";

import Penduduk from "./Statistik/Penduduk";
import APBDes from "./Statistik/APBDes";
import Disabilitas from "./Statistik/Disabilitas";
import Bansos from "./Statistik/Bansos";

const Statistik = () => {
  return (
    <div className="min-h-screen px-4 py-8">
      {/* Menu Statistik */}
      <StatistikMenu />

      {/* Konten Berdasarkan Routing */}
      <Routes>
        <Route index element={<Navigate to="penduduk" replace />} />
        <Route path="penduduk" element={<Penduduk />} />
        <Route path="apbdes" element={<APBDes />} />
        <Route path="disabilitas" element={<Disabilitas />} />
        <Route path="bansos" element={<Bansos />} />
      </Routes>
    </div>
  );
};

export default Statistik;
