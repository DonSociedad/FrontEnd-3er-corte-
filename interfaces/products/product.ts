export interface IProduct {
    id: string; // El backend devuelve id (transformado)
    key: string; 
    name: string;
    price: number;
    category: 'skins' | 'hats' | 'eyes' | 'mouths' | 'bodies' | string;
    createdAt?: string;
}

// Para el formulario de creación
export interface ICreateProductPayload {
    key: string;
    name: string;
    price: number;
    category: string;
}