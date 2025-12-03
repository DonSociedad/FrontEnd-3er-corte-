import { useState, useEffect, useMemo } from 'react';
import { getAllUsersService, updateUserByAdminService } from '@/libs/usersService';
import { IUserProfile } from '@/interfaces/users/user';

export default function useAdminUsers() {
    const [users, setUsers] = useState<IUserProfile[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('');

    // Estado para feedback de actualización
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        const { data, error } = await getAllUsersService();
        if (error) setError(error);
        else if (data) setUsers(data);
        setIsLoading(false);
    };

    const updateUser = async (id: string, updatedData: Partial<IUserProfile>) => {
        setIsUpdating(true);
        const { data, error } = await updateUserByAdminService(id, updatedData);

        if (error) {
            alert("Error actualizando: " + error);
        } else if (data) {
            // Actualización optimista en la lista local
            setUsers(prev => prev.map(user => 
                user.id === id ? { ...user, ...updatedData } : user
            ));
        }
        setIsUpdating(false);
        return { success: !error };
    };

    const filteredUsers = useMemo(() => {
        const term = filter.toLowerCase();
        return users.filter(user => 
            user.name.toLowerCase().includes(term) ||
            user.lastName.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term)
        );
    }, [users, filter]);

    return {
        users: filteredUsers,
        totalUsers: users.length,
        isLoading,
        error,
        filter,
        setFilter,
        updateUser, 
        isUpdating
    };
}