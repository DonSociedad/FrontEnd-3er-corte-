import { apiFetch } from "./singletonFetch";
import { IProduct } from "@/interfaces/products/product";

export const getAllProductsService = async () => {
  try {
    const response = await apiFetch('/products', 'GET');
    return { data: response as IProduct[], error: null };
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    return { data: null, error: error.message };
  }
};
