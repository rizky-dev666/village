import React from "react";
import BumdesSection from "../components/PotensiEkonomi/BumdesSection";
import WisataSection from "../components/PotensiEkonomi/WisataSection";
import KoperasiSection from "../components/PotensiEkonomi/koperasiSection";
import InvestasiSection from "../components/PotensiEkonomi/investasiSection";
import UMKMSection from "../components/PotensiEkonomi/UMKMSection";

export default function BumdesPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        <BumdesSection />
        <UMKMSection />
        <WisataSection />
        <KoperasiSection />
        <InvestasiSection />
      </div>
    </div>
  );
}
