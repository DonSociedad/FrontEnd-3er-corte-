'use client';

import { useState } from 'react';
import ShopItemCard from '@/components/molecules/creator-studio/shopItemCard';
import { ShopItem } from '@/interfaces/shop';
import Image from 'next/image';

interface ShopComponentProps {
  onItemSelected: (item: ShopItem) => void;
  userCoins: number;
  onBuyItem: (item: ShopItem) => void;
}

export default function ShopComponent({ onItemSelected, userCoins, onBuyItem }: ShopComponentProps) {
  
  // Datos de ejemplo para los ítems de la tienda
  const shopItems: ShopItem[] = [
    { id: '1', name: 'Monocle', image: '/images/shop/monocle.png', price: 50, type: 'outfit' },
    { id: '2', name: 'Traje de Negocios', image: '/images/shop/suit.png', price: 200, type: 'outfit' },
    { id: '3', name: 'Corbata de Lujo', image: '/images/shop/tie.png', price: 150, type: 'outfit' },
    { id: '4', name: 'Escritorio Moderno', image: '/images/shop/desk.png', price: 1000, type: 'environment' },
    { id: '5', name: 'Silla Cómoda', image: '/images/shop/chair.png', price: 800, type: 'environment' },
    { id: '6', name: 'Plantita', image: '/images/shop/plant.png', price: 30, type: 'environment' },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-t-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Tienda</h2>
        <div className="flex items-center text-white text-lg">
          <Image src="/images/coin.png" alt="Monedas" width={24} height={24} className="mr-2" />
          {userCoins}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-60 overflow-y-auto">
        {shopItems.map((item) => (
          <ShopItemCard
            key={item.id}
            item={item}
            onBuy={onBuyItem}
            userCoins={userCoins}
          />
        ))}
      </div>
    </div>
  );
}