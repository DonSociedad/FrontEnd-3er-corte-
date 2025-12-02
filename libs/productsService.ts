import { apiFetch } from "./singletonFetch";
import { IProduct, ICreateProductPayload } from "@/interfaces/products/product";

export const getAllProductsService = async () => {
  try {
    const response = await apiFetch('/products', 'GET');
    return { data: response as IProduct[], error: null };
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    return { data: null, error: error.message };
  }
};

export const createProductService = async (product: ICreateProductPayload) => {
  try {
    const response = await apiFetch('/products', 'POST', product);
    return { data: response, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const deleteProductService = async (id: string) => {
  try {
    await apiFetch(`/products/${id}`, 'DELETE');
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getProductByIdService = async (id: string) => {
  try {
    const response = await apiFetch(`/products/${id}`, 'GET');
    return { data: response as IProduct, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const updateProductService = async (id: string, product: Partial<ICreateProductPayload>) => {
  try {
    const response = await apiFetch(`/products/${id}`, 'PATCH', product);
    return { data: response, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};