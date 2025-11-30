"use client";
import Link from "next/link";
import ProductTable from "@/components/organism/admin/productTableComponent";

export default function AdminProductsPage() {
  return (
    <div className="p-8 md:p-12">
      <div className="mb-8 flex justify-between items-end">
        <div>
            <h1 className="text-4xl font-extrabold text-gray-800">Tienda y Productos</h1>
            <p className="text-gray-500 mt-2">Gestiona las skins y accesorios del juego.</p>
        </div>
        <Link href="/admin/products/create" className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 shadow-lg flex gap-2">
            <span>+</span> Nuevo Producto
        </Link>
      </div>
      <ProductTable />
    </div>
  );
}