import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProductService, getProductByIdService, updateProductService } from '@/libs/productsService';
import { ICreateProductPayload } from '@/interfaces/products/product';
import { AvatarCategory } from '@/utils/avatarCatalog';
import { useNotification } from '@/contexts/notificationContext';

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
    const [isEditMode, setIsEditMode] = useState(!!productId);

    const [formData, setFormData] = useState<ICreateProductPayload>({
        name: '',
        key: '',
        price: 0,
        category: 'skins',
        isPremium: false
    });

    // Si hay ID, cargamos los datos del producto
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
                    // Asumimos valida inicialmente si ya existe, el onError del Image la corregirá si no
                    setIsImageValid(true); 
                } else {
                    showNotification("Error cargando producto", 'error');
                    router.push('/admin/products');
                }
                setIsLoading(false);
            });
        }
    }, [productId, router]);

    const updateField = (field: keyof ICreateProductPayload, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (field === 'key' || field === 'category') {
            setIsImageValid(false);
        }
    };

    const submit = async () => {
        setIsLoading(true);

        if (!formData.key || !formData.name) {
            showNotification("Completa todos los campos", 'error');
            setIsLoading(false);
            return;
        }

        if (!isImageValid) {
            showNotification("❌ La imagen no es válida. Revisa la ruta en 'public/images/pig/...'", 'error');
            setIsLoading(false);
            return;
        }

        let result;
        if (isEditMode && productId) {
            // Modo Edición
            result = await updateProductService(productId, formData);
        } else {
            // Modo Creación
            result = await createProductService(formData);
        }

        if (result.error) {
            showNotification("Error: " + result.error, 'error');
        } else {
            showNotification(isEditMode ? "Producto actualizado" : "Producto creado", 'success');
            router.push('/admin/products');
        }
        setIsLoading(false);
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