export interface ShopItem {
  id: string;
  name: string;
  image: string; 
  price: number;
  type: 'outfit' | 'environment'; 
}