'use client';

import { useState } from 'react';
import { ShopItem } from '@/interfaces/shopPet/shop';

export function useCreatorStudio() {
  const [currentOutfit, setCurrentOutfit] = useState<string>('/images/piggy/default-outfit.png');
  const [currentEnvironment, setCurrentEnvironment] = useState<string>('/images/piggy/default-environment.png');
  const [userCoins, setUserCoins] = useState<number>(1000); // Monedas iniciales
  const [showShop, setShowShop] = useState<boolean>(false);
  const [ownedItems, setOwnedItems] = useState<ShopItem[]>([]); // Items que el usuario posee

  const applyItem = (item: ShopItem) => {
    if (item.type === 'outfit') {
      setCurrentOutfit(item.image);
    } else if (item.type === 'environment') {
      setCurrentEnvironment(item.image);
    }
  };

  const buyItem = (item: ShopItem) => {
    if (userCoins >= item.price) {
      setUserCoins(prev => prev - item.price);
      setOwnedItems(prev => [...prev, item]);
      applyItem(item);
      alert(`Has comprado ${item.name}!`);
    } else {
      alert('No tienes suficientes monedas para comprar este artículo.');
    }
  };

  const toggleShop = () => {
    setShowShop(prev => !prev);
  };

  return {
    currentOutfit,
    currentEnvironment,
    userCoins,
    showShop,
    ownedItems, 
    applyItem,
    buyItem,
    toggleShop,
    setCurrentOutfit, 
    setCurrentEnvironment, 
  };
}