"use client";

// 1. Importamos el hook unificado (ajusta la ruta si lo guardaste en otro lado)
import useProductForm from "@/hooks/admin/useProductForm";
import Link from "next/link";
import Image from "next/image";

export default function CreateProductPage() {
  // 2. Usamos el hook SIN pasar ID. Esto le indica que es CREACIÓN.
  const { 
    formData, 
    updateField, 
    submit, 
    isLoading, 
    categories, 
    isImageValid, 
    setIsImageValid 
  } = useProductForm(); // <--- Sin argumentos = Create Mode

  // Aseguramos que la ruta coincida con tu estructura real (images/pig)
  const previewPath = `/images/pig/${formData.category}/${formData.key}.png`;

  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto pb-24">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-extrabold text-gray-800">Agregar Producto</h1>
            <p className="text-gray-500 text-sm mt-1">Añade un nuevo item al catálogo.</p>
        </div>
        <Link href="/admin/products" className="text-gray-500 font-bold hover:text-black transition-colors">
            Cancelar
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* --- FORMULARIO --- */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-6">
            
            {/* Nombre */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre Visible</label>
                <input 
                    type="text" 
                    className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-black outline-none font-bold transition-colors"
                    placeholder="Ej: Sombrero de Fiesta"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                />
            </div>

            {/* Categoría y Precio */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Categoría</label>
                    <select 
                        className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-black outline-none bg-white cursor-pointer"
                        value={formData.category}
                        onChange={(e) => updateField('category', e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Precio</label>
                    <input 
                        type="number" 
                        min="0"
                        className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-black outline-none"
                        value={formData.price}
                        onChange={(e) => updateField('price', Number(e.target.value))}
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 p-3 border-2 border-amber-100 bg-amber-50 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors">
                <input 
                    type="checkbox" 
                    id="isPremium"
                    className="w-5 h-5 accent-amber-500 cursor-pointer"
                    checked={formData.isPremium || false}
                    onChange={(e) => updateField('isPremium', e.target.checked)}
                />
                <label htmlFor="isPremium" className="cursor-pointer flex-1">
                    <span className="block text-xs font-bold text-amber-700 uppercase">¿Es Premium?</span>
                    <span className="text-xs text-amber-600">Solo usuarios Plus podrán comprarlo.</span>
                </label>
                <div className="text-xl">👑</div>
            </div>

            {/* Key / Archivo */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Key (Nombre Archivo)</label>
                <div className="relative">
                    <input 
                        type="text" 
                        className={`w-full border-2 rounded-xl p-3 pl-3 pr-12 outline-none font-mono text-sm transition-colors ${
                            formData.key && !isImageValid ? 'border-red-300 bg-red-50' : 
                            formData.key && isImageValid ? 'border-green-300 bg-green-50' : 
                            'border-gray-200 focus:border-black'
                        }`}
                        placeholder="Ej: party_hat"
                        value={formData.key}
                        // Forzamos minúsculas y guiones bajos automáticamente
                        onChange={(e) => updateField('key', e.target.value.replace(/\s+/g, '_').toLowerCase())}
                    />
                    <span className="absolute right-3 top-3 text-gray-400 font-mono text-sm">.png</span>
                </div>
                
                {/* Mensaje de estado de imagen */}
                <div className="mt-2 h-4">
                    {formData.key && (
                        <p className={`text-[10px] font-bold flex items-center gap-1 ${isImageValid ? 'text-green-600' : 'text-red-500'}`}>
                            {isImageValid ? '✅ Imagen encontrada' : '❌ Imagen no encontrada en public/'}
                        </p>
                    )}
                </div>
            </div>

            <button 
                onClick={submit}
                // Deshabilitamos si está cargando O si la imagen NO es válida
                disabled={isLoading || !isImageValid}
                className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:-translate-y-1 active:translate-y-0"
            >
                {isLoading ? "Creando..." : "Crear Producto"}
            </button>
        </div>

        {/* --- PREVIEW --- */}
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 h-fit sticky top-6">
            <h3 className="text-gray-400 font-bold mb-4 uppercase text-xs">Previsualización</h3>
            
            <div className="w-40 h-40 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-200 mb-4 overflow-hidden relative">
                {formData.key ? (
                    <Image 
                        src={previewPath}
                        alt="Preview"
                        width={120}
                        height={120}
                        className="object-contain z-10 transition-transform hover:scale-110"
                        unoptimized // Vital para detectar la imagen local al instante
                        onLoad={() => setIsImageValid(true)}
                        onError={() => setIsImageValid(false)}
                    />
                ) : (
                    <span className="text-4xl text-gray-200">?</span>
                )}
                
                {/* Indicador visual en la preview */}
                <div className={`absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-white ${isImageValid ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>

            <div className="text-center w-full">
                <p className="text-xs text-gray-500 mb-1">Ruta esperada:</p>
                <code className="text-[10px] bg-gray-200 text-gray-600 px-2 py-1 rounded block break-all font-mono">
                    /public{previewPath}
                </code>
            </div>
        </div>

      </div>
    </div>
  );
}