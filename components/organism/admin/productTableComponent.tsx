"use client";

import useAdminProducts from "@/hooks/admin/useAdminProducts";

import Image from "next/image";
import Link from "next/link";

// Definimos las pestañas disponibles
const TABS = [
    { label: 'Todo', value: 'all' },
    { label: 'Skins', value: 'skins' },
    { label: 'Sombreros', value: 'hats' },
    { label: 'Ojos', value: 'eyes' },
    { label: 'Bocas', value: 'faces' },
    { label: 'Cuerpos', value: 'bodies' },
];

export default function ProductTable() {
    const { 
        products, 
        isLoading, 
        filter, 
        setFilter, 
        selectedCategory,
        setSelectedCategory, 
        handleDelete 
    } = useAdminProducts();

    if (isLoading) return <div className="p-10 text-center animate-pulse text-gray-500">Cargando inventario...</div>;

    const getImageUrl = (category: string, key: string) => {
        if (key === 'none') return '/images/logos/pig/outline.png';
        return `/images/pig/${category}/${key}.png`;
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
            
            {/* Header con Buscador */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Inventario <span className="text-sm font-normal text-gray-500">({products.length} items)</span>
                </h2>
                <input 
                    type="text" 
                    placeholder="Buscar por nombre..." 
                    className="border-2 border-gray-300 rounded-xl px-4 py-2 w-full md:w-64 focus:border-black outline-none transition-colors"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            {/* --- BARRA DE FILTROS (TABS) --- */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-100 pb-4">
                {TABS.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setSelectedCategory(tab.value)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                            selectedCategory === tab.value
                                ? 'bg-black text-white shadow-md transform scale-105'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Grid de Productos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-2xl p-4 flex flex-col items-center relative group hover:border-black hover:shadow-lg transition-all bg-gray-50/50">
                        
                        {/* Botones Flotantes (Editar / Borrar) */}
                        <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                            <Link 
                                href={`/admin/products/${product.id}`}
                                className="bg-white text-gray-400 p-1.5 rounded-lg hover:bg-blue-500 hover:text-white shadow-sm border border-gray-200 transition-colors"
                                title="Editar"
                            >
                                ✏️
                            </Link>
                            <button 
                                onClick={() => handleDelete(product.id)}
                                className="bg-white text-gray-400 p-1.5 rounded-lg hover:bg-red-500 hover:text-white shadow-sm border border-gray-200"
                                title="Eliminar"
                            >
                                🗑️
                            </button>
                        </div>

                        {/* Imagen */}
                        <div className="w-full aspect-square relative mb-3 bg-white rounded-xl border border-gray-100 flex items-center justify-center p-2">
                            <Image 
                                src={getImageUrl(product.category, product.key)}
                                alt={product.name}
                                width={100}
                                height={100}
                                className="object-contain drop-shadow-sm transition-transform group-hover:scale-110"
                                unoptimized={true} 
                            />
                        </div>

                        {/* Info */}
                        <div className="text-center w-full">
                            <h3 className="font-bold text-sm text-gray-800 truncate">{product.name}</h3>
                            <p className="text-[10px] text-gray-400 font-mono mb-2">{product.key}</p>
                            
                            <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                💰 {product.price}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <div className="text-center py-12 text-gray-400 flex flex-col items-center">
                    <span className="text-4xl mb-2">
                        <Image 
                            src="/images/icons/piggy.png" 
                            alt="No products"   
                            width={48}
                            height={48}
                        />
                    </span>
                    <p>No hay productos en esta categoría.</p>
                </div>
            )}
        </div>
    );
}