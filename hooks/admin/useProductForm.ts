import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProductService, getProductByIdService, updateProductService } from '@/libs/productsService';
import { ICreateProductPayload } from '@/interfaces/products/product';
import { AvatarCategory } from '@/utils/avatarCatalog'; 

const CATEGORY_OPTIONS = [
    { label: 'Pieles', value: 'skins' },
    { label: 'Sombreros', value: 'hats' },
    { label: 'Ojos', value: 'eyes' },
    { label: 'Bocas', value: 'faces' },
    { label: 'Cuerpos', value: 'bodies' },
];

export default function useProductForm(productId?: string) {
    const router = useRouter();
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
                    alert("Error cargando producto");
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
            alert("Completa todos los campos");
            setIsLoading(false);
            return;
        }

        if (!isImageValid) {
            alert("❌ La imagen no es válida. Revisa la ruta en 'public/images/pig/...'");
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
            alert("Error: " + result.error);
        } else {
            alert(isEditMode ? "Producto actualizado" : "Producto creado");
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