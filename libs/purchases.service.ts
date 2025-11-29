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