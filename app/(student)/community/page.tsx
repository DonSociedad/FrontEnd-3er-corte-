'use client';
import HeaderComponent from "@/components/organism/headerComponent";
import CommunityOrganism from "@/components/organism/community/communityOrganims";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#fff0f5]">
      {/* 1. Header Global */}
      <HeaderComponent />
      
      {/* 2. Contenedor Principal */}
      <main className="max-w-7xl mx-auto p-6 md:p-10">
        
        {/* 3. El Organismo de Comunidad */}
        <CommunityOrganism />
        
      </main>
    </div>
  );
}