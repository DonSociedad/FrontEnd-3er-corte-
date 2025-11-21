// components/molecules/shopItemCard.tsx
import Image from 'next/image';
import { ShopItem } from '@/interfaces/shop';
import ButtonComponent from '@/components/atoms/buttonComponents'

interface ShopItemCardProps {
  item: ShopItem;
  onBuy: (item: ShopItem) => void;
  userCoins: number;
}

export default function ShopItemCard({ item, onBuy, userCoins }: ShopItemCardProps) {
  const canAfford = userCoins >= item.price;

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md flex flex-col items-center">
      <Image src={item.image} alt={item.name} width={80} height={80} className="mb-2" />
      <h3 className="text-white text-lg font-semibold">{item.name}</h3>
      <p className="text-gray-300 mb-4">{item.price} Monedas</p>
      <ButtonComponent
        type={3} 
        content={canAfford ? 'Comprar' : 'Insuficiente'}
        onClick={() => canAfford && onBuy(item)}
      />
    </div>
  );
}