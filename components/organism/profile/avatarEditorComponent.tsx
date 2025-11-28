import { useState } from 'react';
import { IPigData } from '@/interfaces/users/user';
import { AvatarCategory, getItemsByCategory } from '@/utils/avatarCatalog';
import { getPigAssetPath } from '@/utils/pigHelpers';

interface AvatarEditorProps {
  pigData: IPigData;
  onEquip: (category: string, itemId: string) => void;
}

export default function AvatarEditor({ pigData, onEquip }: AvatarEditorProps) {
  const [activeTab, setActiveTab] = useState<AvatarCategory>('hats');

  // Categorías disponibles para las pestañas
  const tabs: { key: AvatarCategory; label: string; icon: string }[] = [
    { key: 'hats', label: 'Sombreros', icon: '🎩' },
    { key: 'bodies', label: 'Ropa', icon: '👕' },
    { key: 'eyes', label: 'Ojos', icon: '👓' },
    { key: 'faces', label: 'Boca', icon: '👄' },
    { key: 'skins', label: 'Piel', icon: '🎨' },
  ];

  const items = getItemsByCategory(activeTab);

  return (
    <div className="flex flex-col h-full">
      {/* 1. Pestañas de categorías */}
      <div className="flex justify-between border-b border-gray-100 mb-4 pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex flex-col items-center px-3 py-1 rounded-lg transition-all ${
              activeTab === tab.key 
                ? 'bg-red-50 text-red-500 font-bold scale-105' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 2. Grilla de items */}
      <div className="grid grid-cols-3 gap-3 overflow-y-auto pr-2 custom-scrollbar max-h-[300px]">
        {items.map((item) => {
          const isOwned = pigData.inventory.includes(item.id);
          
          // Mapeo inverso sucio para saber si está equipado (simple check)
          const fieldMap: any = { hats: 'hat', bodies: 'body', eyes: 'eyes', faces: 'mouth', skins: 'skin' };
          // @ts-ignore
          const isEquipped = pigData.equipped[fieldMap[activeTab]] === item.id;

          // Obtenemos la imagen para la miniatura
          const imgSrc = getPigAssetPath(activeTab, item.id);

          return (
            <button
              key={item.id}
              disabled={!isOwned}
              onClick={() => onEquip(activeTab, item.id)}
              className={`
                relative p-2 rounded-xl border-2 flex flex-col items-center justify-center transition-all
                ${isEquipped ? 'border-red-500 bg-red-50 ring-2 ring-red-200' : 'border-gray-200'}
                ${!isOwned ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:border-red-300 hover:shadow-md active:scale-95'}
              `}
            >
              <div className="w-16 h-16 flex items-center justify-center mb-1">
                  {imgSrc ? (
                      <img src={imgSrc} alt={item.name} className="max-w-full max-h-full object-contain" />
                  ) : (
                      <span className="text-2xl text-gray-300">🚫</span> 
                  )}
              </div>
              <span className="text-[10px] font-bold text-gray-600 text-center leading-tight">
                {item.name}
              </span>

              {!isOwned && (
                <div className="absolute top-1 right-1 bg-gray-200 rounded-full p-1">
                   🔒
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}