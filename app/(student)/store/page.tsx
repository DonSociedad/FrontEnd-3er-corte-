'use client';

import useStore from '@/hooks/shopPig/useStore';
import ProductCard from '@/components/molecules/shopPig/productCartComponent';
import PigPreview from '@/components/organism/shopPig/pigPreviewComponent';

// Mapeo para textos bonitos en los tabs
const CATEGORY_NAMES: Record<string, string> = {
    all: 'Todos',
    clothing: 'Ropa',
    hat: 'Sombreros',
    eyes: 'Ojos',
    mouth: 'Bocas',
    skin: 'Pieles',
    accessories: 'Accesorios',
    hats: 'Sombreros',
    bodies: 'Ropa',
    faces: 'Boca',
    skins: 'Pieles',
    body: 'Ropa',
    face: 'Boca'
};

export default function StorePage() {
    const { 
        user, 
        products, 
        categories, 
        filter, 
        setFilter, 
        handleBuy, 
        purchasingKey, 
        loading 
    } = useStore();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                 {/* Spinner simple con Tailwind */}
                <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header simple similar a la imagen */}
            <header className="bg-white border-b-2 border-gray-100 py-4 px-6 mb-8 sticky top-0 z-40">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-black text-gray-700 tracking-tight">Tienda Piglance</h1>
                    {/* Aquí podrías poner un Link para volver al Home */}
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* COLUMNA IZQUIERDA: Preview del Cerdo */}
                <aside className="lg:col-span-5 xl:col-span-4">
                    <PigPreview user={user} />
                </aside>

                {/* COLUMNA DERECHA: Productos */}
                <section className="lg:col-span-7 xl:col-span-8">
                    
                    {/* Tabs de Filtro */}
                    <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`
                                    px-5 py-2 rounded-xl font-bold text-sm transition-all border-b-4 active:border-b-0 active:translate-y-1
                                    ${filter === cat
                                        ? 'bg-red-50 text-red-500 border-red-300'
                                        : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'
                                    }
                                `}
                            >
                                {CATEGORY_NAMES[cat] || cat.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Grid de Items */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {products.length > 0 ? products.map((product) => (
                            <ProductCard
                                key={product.key}
                                product={product}
                                isOwned={user?.pig.inventory.includes(product.key) || false}
                                canAfford={(user?.coins || 0) >= product.price}
                                isProcessing={purchasingKey === product.key}
                                onBuy={handleBuy}
                            />
                        )) : (
                            <div className="col-span-full py-10 text-center text-gray-400">
                                <p>No hay productos disponibles en esta categoría.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}