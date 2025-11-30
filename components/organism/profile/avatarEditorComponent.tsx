import { useState } from 'react';
import Image from "next/image";
import { IPigData } from '@/interfaces/users/user';
import { AvatarCategory } from '@/utils/avatarCatalog';
import { getPigAssetPath } from '@/utils/pigHelpers';
import useProducts from '@/hooks/products/useProducts';

interface AvatarEditorProps {
  pigData: IPigData;
  onEquip: (category: string, itemId: string) => void;
}

export default function AvatarEditor({ pigData, onEquip }: AvatarEditorProps) {
  const [activeTab, setActiveTab] = useState<AvatarCategory>('hats');
  const { products, loading, error } = useProducts();

  // Categorías disponibles
  const tabs: { key: AvatarCategory; label: string; icon: string }[] = [
    { key: 'hats', label: 'Sombreros', icon: '/images/icons/sombreros.png' },
    { key: 'bodies', label: 'Ropa', icon: '/images/icons/ropa.png' },
    { key: 'eyes', label: 'Ojos', icon: '/images/icons/ojos.png' },
    { key: 'faces', label: 'Boca', icon: '/images/icons/labios.png' },
    { key: 'skins', label: 'Piel', icon: '/images/icons/personalizar.png' },
  ];

  const items = products.filter(product => product.category === activeTab);

  // Agregar opción "none" para deseleccionar, excepto para skins, solo si no existe ya
  if (activeTab !== 'skins' && !items.some(item => item.key === 'none')) {
    items.unshift({
      id: 'none',
      key: 'none',
      name: 'Nada',
      price: 0,
      category: activeTab,
      createdAt: ''
    });
  }

  // Asegurar que "none" siempre esté primero
  items.sort((a, b) => {
    if (a.key === 'none') return -1;
    if (b.key === 'none') return 1;
    return 0;
  });

  return (
    <div className="flex flex-col h-full">
      {/* 1. Pestañas de categorías */}
      <div className="flex justify-between border-b border-gray-100 mb-4 pb-2 overflow-x-auto gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all min-w-[70px] ${
              activeTab === tab.key 
                ? 'bg-red-50 text-red-500 font-bold scale-105 shadow-sm' 
                : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
            }`}
          >
            {/* CORRECCIÓN AQUÍ: Usamos Image en lugar de texto */}
            <div className="relative w-8 h-8 mb-1">
              <Image 
                src={tab.icon} 
                alt={tab.label}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 overflow-y-auto pr-2 custom-scrollbar max-h-[300px]">
        {loading ? (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-500">Cargando productos...</p>
          </div>
        ) : error ? (
          <div className="col-span-3 text-center py-8">
            <p className="text-red-500">Error al cargar productos</p>
          </div>
        ) : (
          items.map((item) => {
            const isOwned = item.key === 'none' || pigData.inventory.includes(item.key);

            // Mapeo inverso
            const fieldMap: Record<string, string> = { hats: 'hat', bodies: 'body', eyes: 'eyes', faces: 'mouth', skins: 'skin' };
            // @ts-expect-error: TypeScript cannot infer the exact type of equipped fields
            const currentEquippedId = pigData.equipped[fieldMap[activeTab]];
            const isEquipped = currentEquippedId === item.key;

            const imgSrc = getPigAssetPath(activeTab, item.key);

          return (
            <button
              key={item.id}
              disabled={!isOwned}
              onClick={() => onEquip(activeTab, item.key)}
              className={`
                relative p-2 rounded-xl border-2 flex flex-col items-center justify-center transition-all h-28
                ${isEquipped ? 'border-red-500 bg-red-50 ring-2 ring-red-200' : 'border-gray-200 bg-white'}
                ${!isOwned ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:border-red-300 hover:shadow-md active:scale-95 cursor-pointer'}
              `}
            >
              <div className="relative w-14 h-14 flex items-center justify-center mb-1">
                  {imgSrc ? (
                      <Image 
                        src={imgSrc} 
                        alt={item.name} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain" 
                      />
                  ) : (
                      <div className="relative w-8 h-8 opacity-40">
                        <Image    
                          src="/images/icons/negacion.png" 
                          alt="Nada equipado"
                          fill
                          className="object-contain"
                        />
                      </div>
                  )}
              </div>
              
              <span className="text-[10px] font-bold text-gray-600 text-center leading-tight line-clamp-2">
                {item.name}
              </span>

              {!isOwned && (
                <div className="absolute top-1 right-1 bg-gray-100 rounded-full p-1 shadow-sm z-10">
                  <Image    
                    src="/images/icons/candado.png" 
                    alt="Bloqueado"
                    width={10}
                    height={10}
                    className="object-contain"
                  />
                </div>
              )}
            </button>
          );
        })
        )}
      </div>
    </div>
  );
}
