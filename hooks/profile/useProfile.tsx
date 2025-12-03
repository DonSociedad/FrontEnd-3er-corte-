import { useState, useEffect } from 'react';
import { getUserProfileService, updateUserAvatarService, updateUserProfileService } from '@/libs/usersService';
import { IUserProfile } from '@/interfaces/users/user';

export default function useProfile() {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await getUserProfileService();
      
      if (error) {
        setError(error);
      } else {
        setUser(data);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  // Función para equipar ítems (Ya la tenías)
  const equipItem = async (category: string, itemId: string) => {
    if (!user) return;
    const previousPig = { ...user.pig };
    const backendFieldMap: Record<string, string> = {
      skins: 'skin', hats: 'hat', eyes: 'eyes', faces: 'mouth', bodies: 'body'
    };
    const fieldName = backendFieldMap[category];
    if (!fieldName) return;

    const newEquipped = { ...user.pig.equipped, [fieldName]: itemId };
    setUser({ ...user, pig: { ...user.pig, equipped: newEquipped } });

    const { error } = await updateUserAvatarService({ [fieldName]: itemId });
    if (error) {
      setUser({ ...user, pig: previousPig });
      alert("No se pudo guardar el cambio.");
    }
  };

  // NUEVA FUNCIÓN: Actualizar datos de texto
  const updateUserData = async (name: string, lastName: string) => {
    if (!user) return false;
    setIsUpdating(true);
    
    const { data, error } = await updateUserProfileService({ name, lastName });

    if (error) {
        alert(error);
        setIsUpdating(false);
        return false;
    } else {
        // Actualizamos el estado local con la respuesta del servidor
        // o manualmente si el servidor no devuelve el objeto completo
        if (data) {
            setUser(prev => prev ? ({ ...prev, name: data.name, lastName: data.lastName }) : null);
        } else {
             setUser(prev => prev ? ({ ...prev, name, lastName }) : null);
        }
        setIsUpdating(false);
        return true;
    }
  };

  return { user, loading, error, equipItem, updateUserData, isUpdating }; 
}