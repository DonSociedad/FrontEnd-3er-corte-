import { ShopItem } from "./shop";

export interface ShopItemCardProps {
    item: ShopItem;
    onBuy: (item: ShopItem) => void;
    userCoins: number;
}
