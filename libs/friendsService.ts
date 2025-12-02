import { apiFetch } from "./singletonFetch";

export const getFriendshipStatusService = async (targetUserId: string) => {
    try {
        const response = await apiFetch(`/friends/status/${targetUserId}`, 'GET');
        return { data: response, error: null };
    } catch (error: any) {
        return { data: null, error: error.message };
    }
};

export const sendFriendRequestService = async (receiverId: string) => {
    try {
        const response = await apiFetch('/friends/request', 'POST', { receiverId });
        return { data: response, error: null };
    } catch (error: any) {
        return { data: null, error: error.message };
    }
};

export const getNotificationsService = async () => {
    try {
        const response = await apiFetch('/friends/requests/received', 'GET'); 
        return { data: response, error: null };
    } catch (error: any) {
        return { data: [], error: error.message };
    }
};

export const respondRequestService = async (requestId: string, accept: boolean) => {
    try {
        const response = await apiFetch(`/friends/respond`, 'PATCH', { requestId, accept });
        return { data: response, error: null };
    } catch (error: any) {
        return { data: null, error: error.message };
    }
};