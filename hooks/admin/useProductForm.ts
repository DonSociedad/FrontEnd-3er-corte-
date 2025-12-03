import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createProductService, getProductByIdService, updateProductService } from '@/libs/productsService';
import { ICreateProductPayload } from '@/interfaces/products/product';
import { useNotification } from '@/contexts/notificationContext';

// Movemos constantes fuera del hook para evitar recreaciones
const CATEGORY_OPTIONS = [
    { label: 'Pieles', value: 'skins' },
    { label: 'Sombreros', value: 'hats' },
    { label: 'Ojos', value: 'eyes' },
    { label: 'Bocas', value: 'faces' },
    { label: 'Cuerpos', value: 'bodies' },
];

export default function useProductForm(productId?: string) {
    const router = useRouter();
    const { showNotification } = useNotification();
    const [isLoading, setIsLoading] = useState(false);
    const [isImageValid, setIsImageValid] = useState(false);
    
    // Convertimos productId a booleano para el modo
    const isEditMode = !!productId;

    const [formData, setFormData] = useState<ICreateProductPayload>({
        name: '',
        key: '',
        price: 0,
        category: 'skins',
        isPremium: false
    });

    // Cargar datos iniciales
    useEffect(() => {
        if (productId) {
            setIsLoading(true);
            getProductByIdService(productId).then(({ data, error }) => {
                if (data) {
                    setFormData({
                        name: data.name,
                        key: data.key,
                        price: data.price,
                        category: data.category,
                        isPremium: !!data.isPremium
                    });
                    setIsImageValid(true); 
                } else {
                    showNotification(`Error: ${error || 'Producto no encontrado'}`, 'error');
                    router.push('/admin/products');
                }
                setIsLoading(false);
            });
        }
    }, [productId, router, showNotification]);

    const updateField = useCallback((field: keyof ICreateProductPayload, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        
        // Si cambia algo relacionado con la imagen, reseteamos validez hasta que cargue
        if (field === 'key' || field === 'category') {
            setIsImageValid(false);
        }
    }, []);

    const submit = async () => {
        if (isLoading) return;
        setIsLoading(true);

        // Validaciones Frontend
        if (!formData.key.trim() || !formData.name.trim()) {
            showNotification("El nombre y la Key son obligatorios", 'error');
            setIsLoading(false);
            return;
        }

        if (!isImageValid) {
            showNotification("La imagen no es válida. Revisa la ruta.", 'error');
            setIsLoading(false);
            return;
        }

        try {
            let result;
            if (isEditMode && productId) {
                // PATCH: 
                result = await updateProductService(productId, formData);
            } else {
                // POST
                result = await createProductService(formData);
            }

            if (result.error) {
                showNotification(result.error, 'error');
            } else {
                showNotification(
                    isEditMode ? "Producto actualizado correctamente" : "Producto creado con éxito", 
                    'success'
                );
                router.push('/admin/products');
                router.refresh(); 
            }
        } catch (err) {
            console.error(err);
            showNotification("Ocurrió un error inesperado", 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return { 
        formData, 
        updateField, 
        submit, 
        isLoading, 
        categories: CATEGORY_OPTIONS, 
        isImageValid, 
        setIsImageValid,
        isEditMode
    };
}