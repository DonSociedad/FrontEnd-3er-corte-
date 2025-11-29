import Image from 'next/image';
import { IProduct } from '@/interfaces/products/product';
import { getPigAssetPath } from '@/utils/pigHelpers';

interface ProductCardProps {
    product: IProduct;
    isOwned: boolean;
    canAfford: boolean;
    isProcessing: boolean;
    onBuy: (product: IProduct) => void;
}

export default function ProductCard({ 
    product, 
    isOwned, 
    canAfford, 
    isProcessing,
    onBuy 
}: ProductCardProps) {
    
    const imagePath = getPigAssetPath(product.category, product.key);

    return (
        <div className={`
            flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200 relative
            ${isOwned 
                ? 'bg-gray-100 border-gray-200 opacity-90' 
                : 'bg-white border-b-4 border-gray-200 hover:border-gray-300'
            }
        `}>
            {/* Si no alcanza el dinero y no lo tiene, ponemos un filtro grisáceo opcional */}
            {!isOwned && !canAfford && (
                <div className="absolute top-2 right-2 text-xs font-bold text-red-400 bg-red-50 px-2 py-1 rounded-full border border-red-100">
                    Faltan monedas
                </div>
            )}

            {/* Imagen del Producto */}
            <div className="relative w-24 h-24 mb-4">
                 {/* El 'sizes' es vital para performance y build optimization */}
                <Image 
                    src={imagePath || '/images/placeholder.png'}
                    alt={product.name}
                    fill
                    className={`object-contain transition-transform ${!isOwned && 'group-hover:scale-110'}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <h3 className="font-bold text-gray-700 mb-1 text-center text-sm">{product.name}</h3>

            <div className="w-full mt-auto pt-3">
                {isOwned ? (
                    <button disabled className="w-full py-2 bg-gray-200 text-gray-400 font-bold rounded-xl text-sm uppercase tracking-wider cursor-default">
                        En Inventario
                    </button>
                ) : (
                    <button
                        onClick={() => onBuy(product)}
                        disabled={!canAfford || isProcessing}
                        className={`
                            w-full py-2 rounded-xl font-bold text-sm shadow-sm transition-all active:translate-y-1 active:border-b-0
                            flex items-center justify-center gap-2
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
                                {/* Icono Moneda CSS puro */}
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