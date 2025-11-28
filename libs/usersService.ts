import { apiFetch } from "./singletonFetch"; 
import { IUserProfile } from "@/interfaces/users/user";

export const getUserProfileService = async () => {
  try {
    const response = await apiFetch('/users/profile', 'GET');
    return { data: response as IUserProfile, error: null };
  } catch (error: any) {
    console.error("Error fetching profile:", error.message);
    return { data: null, error: error.message };
  }
};

export const updateUserAvatarService = async (changes: Record<string, string>) => {
    try {
        const response = await apiFetch('/users/avatar', 'PATCH', changes);
        return { data: response, error: null };
    } catch (error: any) {
        return { data: null, error: error.message };
    }
};