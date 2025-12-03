'use client';

import useStore from '@/hooks/shopPig/useStore';
import ProductCard from '@/components/molecules/shopPig/productCartComponent';
import PigPreview from '@/components/organism/shopPig/pigPreviewComponent';

const CATEGORY_NAMES: Record<string, string> = {
    all: 'Todos',
    skins: 'Pieles',
    hats: 'Sombreros',
    bodies: 'Ropa',
    eyes: 'Ojos',
    faces: 'Bocas',
    skin: 'Pieles',
    hat: 'Sombreros',
    body: 'Ropa',
    clothing: 'Ropa',
    mouth: 'Bocas',
    face: 'Bocas',
    accessories: 'Accesorios'
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
                <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    // Calculamos si es premium una sola vez para pasar el booleano limpio
    const isUserPremium = !!user?.isPremium;

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-8">
            <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* COLUMNA IZQUIERDA: Preview del Cerdo */}
                <aside className="lg:col-span-5 xl:col-span-4">
                    <div className="sticky top-24">
                        <PigPreview user={user} />
                    </div>
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
                                        ? 'bg-red-50 text-red-500 border-red-300 shadow-sm'
                                        : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50 hover:text-gray-600'
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
                                // 👇 AQUÍ ESTÁ EL CAMBIO IMPORTANTE 👇
                                userIsPremium={isUserPremium}
                            />
                        )) : (
                            <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                                <span className="text-4xl mb-2">🐽</span>
                                <p className="font-medium">No hay productos en esta categoría.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}