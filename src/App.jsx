import  { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import PengaduanButton from "./components/PengaduanButton";

import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Statistik from "./pages/Statistik";
import Berita from "./pages/Berita";
import Isiberita from "./pages/Isiberita";
import Galeri from "./pages/Galeri";
import Bumdes from "./pages/Bumdes";
import DetailProduk from "./pages/DetailProduk";
import Penduduk from "./pages/Statistik/Penduduk";
import APBDes from "./pages/Statistik/APBDes";
import Disabilitas from "./pages/Statistik/Disabilitas";
import Bansos from "./pages/Statistik/Bansos";

function App() {
  const [popupSudahTampil, setPopupSudahTampil] = useState(false);

  return (
    <>
      <Header />
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                popupSudahTampil={popupSudahTampil}
                setPopupSudahTampil={setPopupSudahTampil}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home
                popupSudahTampil={popupSudahTampil}
                setPopupSudahTampil={setPopupSudahTampil}
              />
            }
          />
          <Route path="/profil" element={<Profil />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:id" element={<Isiberita />} />
          <Route path="/bumdes" element={<Bumdes />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/produk/:id" element={<DetailProduk />} />

          <Route path="/statistik/*" element={<Statistik />}>
            <Route index element={<Penduduk />} />
            <Route path="penduduk" element={<Penduduk />} />
            <Route path="apbdes" element={<APBDes />} />
            <Route path="disabilitas" element={<Disabilitas />} />
            <Route path="bansos" element={<Bansos />} />
          </Route>
        </Routes>
      </Layout>
      <PengaduanButton />
      <Footer />
    </>
  );
}

export default App;
