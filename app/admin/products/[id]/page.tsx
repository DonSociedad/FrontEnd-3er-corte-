"use client";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import useProductForm from "@/hooks/admin/useProductForm";

// Helper para ruta de imagen
const getPreviewPath = (category: string, key: string) => 
    `/images/pig/${category}/${key}.png`;

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    // Desempaquetamos params (Next.js 15)
    const unwrappedParams = use(params);
    
    const { 
        formData, 
        updateField, 
        submit, 
        handleDelete, 
        isLoading, 
        categories, 
        isImageValid, 
        setIsImageValid,
        isEditMode   
    } = useProductForm(unwrappedParams.id);

    const previewPath = getPreviewPath(formData.category, formData.key);

    return (
        <div className="p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800">Editar Producto</h1>
                    <p className="text-gray-500 text-sm mt-1">ID: {unwrappedParams.id}</p>
                </div>
                <Link href="/admin/products" className="text-gray-500 font-bold hover:text-black transition-colors">
                    Cancelar
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* COLUMNA IZQUIERDA: FORMULARIO */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-6">
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                            Nombre Visible
                        </label>
                        <div>
                            <input 
                                type="text" 
                                id="name"
                                name="name"
                                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-black outline-none transition-colors"
                                value={formData.name}
                                onChange={(e) => updateField('name', e.target.value)}
                                placeholder="Ej: Cerdo Elegante"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                Categoría
                            </label>
                            <select 
                                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-black outline-none bg-white cursor-pointer transition-colors"
                                value={formData.category}
                                onChange={(e) => updateField('category', e.target.value)}
                            >
                                {categories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                Precio
                            </label>
                            <input 
                                type="number" 
                                min="0"
                                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-black outline-none transition-colors"
                                value={formData.price}
                                onChange={(e) => updateField('price', Number(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Checkbox Premium */}
                    <div 
                        className="flex items-center gap-3 p-3 border-2 border-amber-100 bg-amber-50 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors"
                        onClick={() => updateField('isPremium', !formData.isPremium)}
                    >
                        <input 
                            type="checkbox" 
                            id="isPremium"
                            className="w-5 h-5 accent-amber-500 cursor-pointer pointer-events-none"
                            checked={formData.isPremium || false}
                            readOnly
                        />
                        <div className="flex-1">
                            <span className="block text-xs font-bold text-amber-700 uppercase">¿Es Premium?</span>
                            <span className="text-xs text-amber-600">Solo usuarios Plus podrán comprarlo.</span>
                        </div>
                        <div className="text-xl">👑</div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                            Key (Nombre Archivo)
                        </label>
                        <div className="relative">
                            <input 
                                type="text" 
                                className={`w-full border-2 rounded-xl p-3 pl-3 pr-12 outline-none font-mono text-sm transition-colors ${
                                    formData.key && !isImageValid ? 'border-red-300 bg-red-50' : 
                                    formData.key && isImageValid ? 'border-green-300 bg-green-50' : 
                                    'border-gray-200 focus:border-black'
                                }`}
                                value={formData.key}
                                onChange={(e) => updateField('key', e.target.value.replace(/\s+/g, '_').toLowerCase())}
                            />
                            <span className="absolute right-3 top-3 text-gray-400 font-mono text-sm">.png</span>
                        </div>
                        
                        <div className="bg-orange-50 p-2 rounded mt-2 border border-orange-100">
                            <div className="text-[10px] text-orange-700 font-bold flex items-center gap-1">
                                <Image
                                    src="/images/icons/advertencia.png"
                                    alt="Advertencia"
                                    width={12}
                                    height={12}
                                /> 
                                <span>Cuidado al editar la Key</span>
                            </div>
                            <p className="text-[10px] text-orange-600 leading-tight mt-1">
                                Si cambias esto, asegúrate que exista el archivo en: <br/>
                                <code className="bg-orange-100 px-1 rounded">public/images/pig/</code>
                            </p>
                        </div>
                    </div>

                    {/* --- ZONA DE ACCIONES --- */}
                    <div className="flex gap-3 pt-2">
                        {/* Botón Guardar */}
                        <button 
                            onClick={submit}
                            disabled={isLoading || !isImageValid}
                            className="flex-1 bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95"
                        >
                            {isLoading ? "Guardando..." : "Actualizar Producto"}
                        </button>

                        {/* Botón Eliminar (Visible solo si es modo edición) */}
                        {isEditMode && (
                            <button 
                                onClick={handleDelete}
                                disabled={isLoading}
                                className="px-5 bg-red-50 text-red-500 border-2 border-red-100 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all flex items-center justify-center group shadow-sm active:scale-95"
                                title="Eliminar producto"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 6h18"></path>
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>
                        )}
                    </div>

                </div>

                {/* COLUMNA DERECHA: PREVIEW */}
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 h-fit sticky top-6">
                    <h3 className="text-gray-400 font-bold mb-4 uppercase text-xs">Previsualización Actual</h3>
                    
                    <div className="w-40 h-40 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-200 mb-4 overflow-hidden relative">
                        {formData.key ? (
                            <Image 
                                src={previewPath}
                                alt={`Preview de ${formData.name}`}
                                width={120}
                                height={120}
                                className="object-contain z-10"
                                unoptimized 
                                priority 
                                onError={() => setIsImageValid(false)}
                                onLoad={() => setIsImageValid(true)}
                            />
                        ) : (
                            <span className="text-4xl text-gray-200">?</span>
                        )}
                    </div>
                    
                    <div className="text-center w-full">
                        <p className="text-xs text-gray-500 mb-1">Ruta de imagen:</p>
                        <code className="text-[10px] bg-gray-200 px-2 py-1 rounded block break-all text-gray-600 font-mono">
                            {previewPath}
                        </code>
                    </div>
                </div>

            </div>
        </div>
    );
}