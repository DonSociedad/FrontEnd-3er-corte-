import { apiFetch } from "./singletonFetch"; 
import { IRawUserResponse, IUserProfile } from "@/interfaces/users/user";

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

export const getAllUsersService = async () => {
  try {
    const response = await apiFetch('/users', 'GET');
    
    if (!Array.isArray(response)) {
        return { data: [], error: null };
    }

    const formattedData: IUserProfile[] = response.map((u: any) => ({
        id: u.id || u._id,
        name: u.name,
        lastName: u.lastName,
        email: u.email,
        role: u.role,
        coins: u.coins,
        pig: u.pig, 
        
        // Pruebas
        completedLessons: u.completedLessons || (u.progress ? u.progress.length : 0),
        friends: u.friends || 0,
        itemsCount: u.pig?.inventory ? u.pig.inventory.length : 0
    }));

    return { data: formattedData, error: null };
  } catch (error: any) {
    console.error("Error fetching users list:", error.message);
    return { data: null, error: error.message || "Error al obtener usuarios" };
  }
};