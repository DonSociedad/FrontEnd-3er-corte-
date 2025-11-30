import { useState, useEffect, useMemo } from 'react';
import { getAllUsersService } from '@/libs/usersService';
import { IUserProfile } from '@/interfaces/users/user';

export default function useAdminUsers() {
    const [users, setUsers] = useState<IUserProfile[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            const { data, error } = await getAllUsersService();
            
            if (error) {
                setError(error);
            } else if (data) {
                setUsers(data);
            }
            
            setIsLoading(false);
        };

        fetchUsers();
    }, []);

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
        setFilter
    };
}