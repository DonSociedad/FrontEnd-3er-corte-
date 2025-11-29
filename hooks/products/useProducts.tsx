import { useState, useEffect } from 'react';
import { getAllProductsService } from '@/libs/productsService';
import { IProduct } from '@/interfaces/products/product';

export default function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await getAllProductsService();

      if (error) {
        setError(error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
