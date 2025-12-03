import { useState, useEffect, useMemo } from 'react';
import { getAllPurchasesService} from '@/libs/purchases.service';
import { IAdminPurchase } from '@/interfaces/admin/adminPurchase';

export default function useAdminPurchases() {
    const [purchases, setPurchases] = useState<IAdminPurchase[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPurchases = async () => {
            setIsLoading(true);
            const { data, error } = await getAllPurchasesService();
            
            if (error) {
                setError(error);
            } else if (data) {
                setPurchases(data);
            }
            
            setIsLoading(false);
        };

        fetchPurchases();
    }, []);

    // Cálculos automáticos
    const stats = useMemo(() => {
        return {
            count: purchases.length, // Cantidad de ventas
            revenue: purchases.reduce((acc, curr) => acc + (curr.pricePaid || 0), 0) // Total monedas
        };
    }, [purchases]);

    return {
        purchases,
        totalSales: stats.count,
        totalRevenue: stats.revenue,
        isLoading,
        error
    };
}