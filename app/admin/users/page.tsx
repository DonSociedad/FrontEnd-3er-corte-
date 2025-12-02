"use client";

import UserTable from "@/components/organism/admin/userTable";

export default function AdminUsersPage() {
  return (
    <div className="p-8 md:p-12">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Gestión de Usuarios
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Administra los estudiantes y administradores de la plataforma.
        </p>
      </div>

      <UserTable />
    </div>
  );
}