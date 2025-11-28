"use client";

import { useState } from "react";
import HeaderComponent from "@/components/organism/headerComponent";
import WorkPlaceComponent from "@/components/molecules/workPlaceComponent";
import ProfileComponent from "@/components/molecules/profileComponent";
import StoreComponent from "@/components/molecules/storeComponent";

export default function LoggedPage() {
  const [activePage, setActivePage] = useState("workplace");

  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Header fijo a la izquierda */}
      <HeaderComponent onNavigate={handleNavigate} />

      {/* Contenido principal (sin footer) */}
      <main className="flex-1 overflow-y-auto bg-gray-100 ml-64">
        {activePage === "workplace" && <WorkPlaceComponent />}
        {activePage === "profile" && <ProfileComponent />}
        {activePage === "store" && <StoreComponent />}
      </main>
    </div>
  );
}
