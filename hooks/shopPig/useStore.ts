import { useState, useEffect, useMemo } from 'react';
import { getAllProductsService } from '@/libs/productsService';
import { getUserProfileService } from '@/libs/usersService';   
import { buyItemService } from '@/libs/purchases.service';
import { IProduct } from '@/interfaces/products/product';
import { IUserProfile } from '@/interfaces/users/user';

export default function useStore() {
    const [user, setUser] = useState<IUserProfile | null>(null);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [purchasingKey, setPurchasingKey] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('all');
    const [error, setError] = useState<string | null>(null);

    // 1. Carga Inicial
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [productsRes, userRes] = await Promise.all([
                    getAllProductsService(),
                    getUserProfileService()
                ]);

                if (productsRes.error) throw new Error(productsRes.error);
                if (userRes.error) throw new Error(userRes.error);

                if (productsRes.data) setProducts(productsRes.data);
                if (userRes.data) setUser(userRes.data);

            } catch (err: any) {
                setError(err.message || 'Error cargando la tienda');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // 2. Lógica de Compra
    const handleBuy = async (product: IProduct) => {
        if (!user) return;
        
        // Validación local rápida
        if (user.coins < product.price) return;

        setPurchasingKey(product.key); // Activa loading en el botón específico

        const { data, error } = await buyItemService(product.key);

        if (error) {
            alert(error); // O usar un Toast
            setPurchasingKey(null);
            return;
        }

        // 3. Actualización Optimista (Sin recargar página)
        setUser(prev => {
            if (!prev) return null;
            return {
                ...prev,
                coins: prev.coins - product.price,
                pig: {
                    ...prev.pig,
                    inventory: [...prev.pig.inventory, product.key]
                }
            };
        });
        
        setPurchasingKey(null);
    };

    // 4. Lógica de Filtrado
    const filteredProducts = useMemo(() => {
        if (filter === 'all') return products;
        return products.filter(p => p.category === filter);
    }, [products, filter]);

    const categories = useMemo(() => {
        const unique = new Set(products.map(p => p.category));
        return ['all', ...Array.from(unique)];
    }, [products]);

    return {
        user,
        products: filteredProducts,
        categories,
        loading,
        error,
        filter,
        setFilter,
        handleBuy,
        purchasingKey
    };
}