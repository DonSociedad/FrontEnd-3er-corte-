import { useState, useEffect } from 'react';
import { getUserProfileService, updateUserAvatarService } from '@/libs/usersService';
import { IUserProfile } from '@/interfaces/users/user';

export default function useProfile() {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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

  const equipItem = async (category: string, itemId: string) => {
    if (!user) return;

    // 1. Guardar estado anterior por si falla
    const previousPig = { ...user.pig };

    // 2. Mapeo de categorías del Front a propiedades del Backend
    const backendFieldMap: Record<string, string> = {
      skins: 'skin',
      hats: 'hat',
      eyes: 'eyes',
      faces: 'mouth',
      bodies: 'body'
    };
    
    const fieldName = backendFieldMap[category];
    if (!fieldName) return;

    // 3. Actualización Optimista
    const newEquipped = { ...user.pig.equipped, [fieldName]: itemId };
    setUser({
      ...user,
      pig: { ...user.pig, equipped: newEquipped }
    });

    // 4. Llamada a API en segundo plano
    const { error } = await updateUserAvatarService({ [fieldName]: itemId });
    
    if (error) {
      console.error("Error guardando avatar:", error);
      // Rollback si falla
      setUser({ ...user, pig: previousPig });
      alert("No se pudo guardar el cambio. ¿Tienes este item?");
    }
  };

  return { user, loading, error, equipItem }; // Exportamos equipItem
}