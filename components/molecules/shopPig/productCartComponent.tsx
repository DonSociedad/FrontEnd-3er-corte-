import Image from 'next/image';
import { IProduct } from '@/interfaces/products/product';
import { getPigAssetPath } from '@/utils/pigHelpers';

interface ProductCardProps {
    product: IProduct;
    isOwned: boolean;
    canAfford: boolean;
    isProcessing: boolean;
    userIsPremium: boolean; // Recibimos el estado
    onBuy: (product: IProduct) => void;
}

export default function ProductCard({ 
    product, 
    isOwned, 
    canAfford, 
    isProcessing,
    userIsPremium,
    onBuy 
}: ProductCardProps) {
    
    const imagePath = getPigAssetPath(product.category, product.key);

    // LÓGICA CLAVE: ¿Está bloqueado por ser premium?
    // Es true si el producto es premium Y el usuario NO lo es.
    const isPremiumLocked = product.isPremium && !userIsPremium;

    return (
        <div className={`
            flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200 relative
            ${isOwned 
                ? 'bg-gray-100 border-gray-200 opacity-90' 
                : product.isPremium // Estilo especial si el producto es Premium
                    ? 'bg-amber-50 border-b-4 border-amber-200 hover:border-amber-300'
                    : 'bg-white border-b-4 border-gray-200 hover:border-gray-300'
            }
        `}>
            
            {/* 1. BADGE DE PREMIUM (CORONA) */}
            {product.isPremium && (
                <div className="absolute top-2 left-2 z-10 text-lg animate-pulse" title="Exclusivo Plus">
                    👑
                </div>
            )}

            {/* 2. ETIQUETA DE FALTAN MONEDAS (Solo si no está bloqueado por premium) */}
            {!isOwned && !canAfford && !isPremiumLocked && (
                <div className="absolute top-2 right-2 text-xs font-bold text-red-400 bg-red-50 px-2 py-1 rounded-full border border-red-100">
                    Faltan monedas
                </div>
            )}

            {/* Imagen del Producto */}
            <div className="relative w-24 h-24 mb-4">
                <Image 
                    src={imagePath || '/images/placeholder.png'}
                    alt={product.name}
                    fill
                    // Si está bloqueado, lo ponemos un poco transparente o gris
                    className={`object-contain transition-transform 
                        ${(!isOwned && !isPremiumLocked) && 'group-hover:scale-110'} 
                        ${isPremiumLocked ? 'opacity-70 grayscale' : ''}
                    `}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* CANDADO SOBRE LA IMAGEN (Opcional, refuerza el bloqueo) */}
                {isPremiumLocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 rounded-full p-2 shadow-sm text-xl">
                            🔒
                        </div>
                    </div>
                )}
            </div>

            {/* Nombre del producto (Dorado si es premium) */}
            <h3 className={`font-bold mb-1 text-center text-sm ${product.isPremium ? 'text-amber-800' : 'text-gray-700'}`}>
                {product.name}
            </h3>

            <div className="w-full mt-auto pt-3">
                {isOwned ? (
                    // CASO 1: YA LO TIENE
                    <button disabled className="w-full py-2 bg-gray-200 text-gray-400 font-bold rounded-xl text-sm uppercase tracking-wider cursor-default">
                        En Inventario
                    </button>
                ) : isPremiumLocked ? (
                    // CASO 2: BLOQUEADO POR PREMIUM (Nuevo)
                    <button
                        disabled 
                        className="w-full py-1 bg-amber-100 text-amber-600 border-b-4 border-amber-200 font-bold rounded-xl text-xs uppercase tracking-wider cursor-not-allowed flex flex-col items-center justify-center h-[40px]"
                    >
                        <span>Exclusivo</span>
                        <span className="text-[9px] opacity-80">Requiere Plus 👑</span>
                    </button>
                ) : (
                    // CASO 3: BOTÓN DE COMPRA NORMAL
                    <button
                        onClick={() => onBuy(product)}
                        disabled={!canAfford || isProcessing}
                        className={`
                            w-full py-2 rounded-xl font-bold text-sm shadow-sm transition-all active:translate-y-1 active:border-b-0
                            flex items-center justify-center gap-2 h-[40px]
                            ${canAfford 
                                ? 'bg-green-500 text-white border-b-4 border-green-700 hover:bg-green-600' 
                                : 'bg-gray-200 text-gray-400 border-b-4 border-gray-300 cursor-not-allowed'
                            }
                        `}
                    >
                        {isProcessing ? (
                            <span className="animate-pulse">Procesando...</span>
                        ) : (
                            <>
                                <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-yellow-600" />
                                {product.price}
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}