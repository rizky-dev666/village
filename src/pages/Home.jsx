import HeroSection from "../components/HeroSection";
import SambutanSection from "../components/SambutanSection";
import BeritaSection from "../components/BeritaSection";
import PetaSection from "../components/PetaSection";
import GaleriSection from "../components/GaleriSection";
import Popup from "../components/Popup";

export default function Home({ popupSudahTampil, setPopupSudahTampil }) {
  return (
    <>
      {!popupSudahTampil && (
        <Popup setPopupSudahTampil={setPopupSudahTampil} />
      )}
      <HeroSection />
      <SambutanSection />
      <BeritaSection />
      <PetaSection />
      <GaleriSection />
    </>
  );
}
