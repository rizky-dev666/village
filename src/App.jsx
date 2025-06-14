import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Statistik from "./pages/Statistik"; // Ini halaman wrapper Statistik
import Berita from "./pages/Berita";
import Isiberita from "./pages/Isiberita";
import Bumdes from "./pages/Bumdes";
import DetailProduk from "./pages/DetailProduk";
import Galeri from "./pages/Galeri";

// Import halaman anak statistik
import Penduduk from "./pages/Statistik/Penduduk";
import APBDes from "./pages/Statistik/APBDes";
import Disabilitas from "./pages/Statistik/Disabilitas";
import Bansos from "./pages/Statistik/Bansos";

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:id" element={<Isiberita />} />
          <Route path="/bumdes" element={<Bumdes />} />
          <Route path="/bumdes/:id" element={<DetailProduk />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/statistik" element={<Statistik />}>
            <Route index element={<Penduduk />} />
            <Route path="penduduk" element={<Penduduk />} />
            <Route path="apbdes" element={<APBDes />} />
            <Route path="disabilitas" element={<Disabilitas />} />
            <Route path="bansos" element={<Bansos />} />
          </Route>
        </Routes>
      </Layout>
      <Footer />
    </>
  );
}

export default App;
