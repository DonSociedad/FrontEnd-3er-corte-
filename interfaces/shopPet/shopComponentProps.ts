import { ShopItem } from "./shop";

export interface ShopComponentProps {
    onItemSelected: (item: ShopItem) => void;
    userCoins: number;
    onBuyItem: (item: ShopItem) => void;
}
