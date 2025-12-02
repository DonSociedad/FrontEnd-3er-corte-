import { useState, useEffect, useMemo } from 'react';
import { getAllProductsService, deleteProductService } from '@/libs/productsService';
import { IProduct } from '@/interfaces/products/product';
import { useNotification } from '@/contexts/notificationContext';

export default function useAdminProducts() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { showNotification } = useNotification();
    
    // Filtros
    const [filter, setFilter] = useState(''); // Texto
    const [selectedCategory, setSelectedCategory] = useState('all'); // Categoría

    const refreshProducts = async () => {
        setIsLoading(true);
        const { data } = await getAllProductsService();
        if (data) setProducts(data);
        setIsLoading(false);
    };

    useEffect(() => {
        refreshProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar este producto?")) return;
        const { error } = await deleteProductService(id);
        if (!error) {
            refreshProducts();
        } else {
            showNotification("Error: " + error, 'error');
        }
    };

    // LÓGICA DE FILTRADO COMBINADO (Texto + Categoría)
    const filteredProducts = useMemo(() => {
        const term = filter.toLowerCase();
        
        return products.filter(p => {
            // 1. Coincidir Texto
            const matchesText = 
                p.name.toLowerCase().includes(term) || 
                p.key.toLowerCase().includes(term);

            // 2. Coincidir Categoría
            const matchesCategory = 
                selectedCategory === 'all' || 
                p.category === selectedCategory;

            return matchesText && matchesCategory;
        });
    }, [products, filter, selectedCategory]);

    return {
        products: filteredProducts,
        isLoading,
        filter, 
        setFilter,
        selectedCategory,     
        setSelectedCategory,  
        handleDelete
    };
}