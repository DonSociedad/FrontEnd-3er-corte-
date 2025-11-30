import type { Metadata } from "next";
import AdminSidebar from "@/components/organism/admin/headerAdminComponent";

export const metadata: Metadata = {
  title: "Admin Dashboard | Piglance",
  description: "Panel de administración de Piglance",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <AdminSidebar />
      
      <main className="flex-1 w-full">
        {children}
      </main>
      
    </div>
  );
}