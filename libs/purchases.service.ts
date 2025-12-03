import { IAdminPurchase } from "@/interfaces/admin/adminPurchase";
import { apiFetch } from "./singletonFetch";

export const buyItemService = async (productKey: string) => {
  try {
    const response = await apiFetch('/store/buy', 'POST', { productKey });
    return { data: response, error: null };
  } catch (error: any) {
    console.error("Error buying item:", error.message);
    return { data: null, error: error.message };
  }
};

export const getAllPurchasesService = async () => {
  try {
    const response = await apiFetch('/store/admin/purchases', 'GET');
    
    if (!Array.isArray(response)) {
        return { data: [], error: null };
    }

    return { data: response as IAdminPurchase[], error: null };
  } catch (error: any) {
    console.error("Error fetching purchases:", error.message);
    return { data: [], error: error.message || "Error al obtener ventas" };
  }
};