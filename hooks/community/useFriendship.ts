'use client';
import { useState, useEffect } from 'react';
import { getFriendshipStatusService, sendFriendRequestService } from '@/libs/friendsService';
import { useNotification } from '@/contexts/notificationContext';

export function useFriendship(targetUserId: string) {
    const [status, setStatus] = useState<'none' | 'friends' | 'pending_sent' | 'pending_received' | 'loading'>('loading');
    const { showNotification } = useNotification();

    useEffect(() => {
        if (!targetUserId) return;
        checkStatus();
    }, [targetUserId]);

    const checkStatus = async () => {
        const { data } = await getFriendshipStatusService(targetUserId);
        if (data) setStatus(data.status);
        else setStatus('none');
    };

    const sendRequest = async () => {
        const { error } = await sendFriendRequestService(targetUserId);
        if (error) {
            showNotification(error, 'error');
        } else {
            setStatus('pending_sent');
            showNotification("Solicitud enviada con éxito", 'success');
        }
    };

    return { status, sendRequest };
}