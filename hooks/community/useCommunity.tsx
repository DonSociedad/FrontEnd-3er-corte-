'use client';

import { useState, useEffect, useMemo } from "react";
import { getCommunityUsersService } from "@/libs/usersService";
import { IUserProfile } from "@/interfaces/users/user";

export function useCommunity() {
    const [users, setUsers] = useState<IUserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // 1. Cargar usuarios al montar
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const { data, error } = await getCommunityUsersService();
                if (error) {
                    console.error(error);
                    setError(error);
                } else if (data) {
                    setUsers(data);
                }
            } catch (err) {
                setError("Error inesperado cargando la comunidad");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // 2. Lógica de filtrado en tiempo real (Memoizado para rendimiento)
    const filteredUsers = useMemo(() => {
        if (!searchTerm) return users;
        
        const lowerTerm = searchTerm.toLowerCase();
        return users.filter(u => 
            u.name.toLowerCase().includes(lowerTerm) || 
            u.lastName.toLowerCase().includes(lowerTerm)
        );
    }, [users, searchTerm]);

    // 3. Retornamos todo lo necesario para la UI
    return {
        users: filteredUsers, 
        totalUsers: users.length, 
        loading,
        error,
        searchTerm,
        setSearchTerm
    };
}

export default useCommunity;