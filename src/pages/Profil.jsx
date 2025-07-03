import React from "react";
import VisiMisiSejarahSection from "../components/Profil/VisiMisiSejarahSection";
import BaganSection from "../components/Profil/BaganSection";
import PetaLokasiSection from "../components/Profil/PetaLokasiSection";
import SKSection from "../components/Profil/SKSection";

export default function BumdesPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        <VisiMisiSejarahSection />
        <BaganSection />
        <PetaLokasiSection />
      </div>
    </div>
  );
}
