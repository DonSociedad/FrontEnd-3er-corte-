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
        isPremium: u.isPremium, 

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

// Obtener lista de usuarios para la comunidad
export const getCommunityUsersService = async () => {
  try {
    const response = await apiFetch('/users/community/search', 'GET'); 
    
    if (!Array.isArray(response)) return { data: [], error: null };

    const formattedData: IUserProfile[] = response.map((u: any) => ({
        id: u.id || u._id,
        name: u.name,
        lastName: u.lastName,
        email: u.email,
        role: u.role,
        coins: u.coins,
        pig: u.pig,
        completedLessons: u.completedLessons || (u.progress ? u.progress.length : 0),
        friends: u.friends || 0,
        itemsCount: u.pig?.inventory ? u.pig.inventory.length : 0
    }));

    return { data: formattedData, error: null };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
};

// Obtener perfil de otro usuario por ID
export const getPublicUserProfileService = async (id: string) => {
  try {
    const response = await apiFetch(`/users/${id}/public`, 'GET');
    return { data: response as IUserProfile, error: null };
  } catch (error: any) {
    console.error("Error fetching public profile:", error.message);
    return { data: null, error: error.message };
  }
};

export const subscribePremiumService = async (plan: 'monthly' | 'yearly') => {
  try {
    // Enviamos el plan en el body
    const response = await apiFetch('/users/subscribe', 'POST', { plan });
    return { data: response as IUserProfile, error: null };
  } catch (error: any) {
    console.error("Error subscribing:", error.message);
    return { data: null, error: error.message || "Error al procesar la suscripción" };
  }
};

export const updateUserProfileService = async (changes: { name?: string; lastName?: string }) => {
  try {
    const response = await apiFetch('/users/profile', 'PATCH', changes);
    return { data: response as IUserProfile, error: null };
  } catch (error: any) {
    console.error("Error updating profile:", error.message);
    return { data: null, error: error.message || "Error al actualizar perfil" };
  }
};

export const updateUserByAdminService = async (userId: string, data: { name?: string; lastName?: string; role?: string; coins?: number }) => {
    try {
        const response = await apiFetch(`/users/${userId}`, 'PATCH', data);
        return { data: response, error: null };
    } catch (error: any) {
        return { data: null, error: error.message || "Error al actualizar usuario" };
    }
};