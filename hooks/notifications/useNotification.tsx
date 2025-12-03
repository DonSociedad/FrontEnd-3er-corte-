'use client';

import { useState, useEffect, useCallback } from 'react';
import { getNotificationsService, respondRequestService } from '@/libs/friendsService';
import { useNotification, useNotification as useNotificationContext } from '@/contexts/notificationContext';
import { IAvatarEquipped } from '@/interfaces/users/user';

type RequestType = {
    _id: string;
    sender: {
        _id: string;
        name: string;
        lastName: string;
        pig: { equipped: IAvatarEquipped };
    };
    createdAt: string;
};

export default function useNotifications() {
    const [requests, setRequests] = useState<RequestType[]>([]);
    const [loading, setLoading] = useState(true);
    const { showNotification } = useNotification();

    const fetchNotifications = useCallback(async () => {
        setLoading(true);
        const { data, error } = await getNotificationsService();
        
        if (error) {
            showNotification(error, 'error');
        }
        
        setRequests(data || []);
        setLoading(false);
    }, [showNotification]);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const handleResponse = async (requestId: string, accept: boolean) => {
        const { error } = await respondRequestService(requestId, accept);
        if (error) {
            showNotification(error, 'error');
        } else {
            showNotification(accept ? "Solicitud aceptada" : "Solicitud rechazada", accept ? 'success' : 'info');
            // Recargar lista
            fetchNotifications(); 
        }
    };

    return {
        requests,
        loading,
        handleResponse,
        refreshNotifications: fetchNotifications
    };
};