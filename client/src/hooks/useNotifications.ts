import { useState, useEffect, useCallback } from 'react';
import { fetchAllUsersNotifications } from '@/services/notificationsService';
import { Notification } from '@/models/notificationsModel';

const useNotifications = (authHeader?: string) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);


    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isAlert, setIsAlert] = useState(false);


    const clearNotifications = useCallback(() => {
        setError("");
        setSuccess("");
    }, []);


    const refreshNotifications = useCallback(async () => {
        if (!authHeader) return;

        const resp = await fetchAllUsersNotifications(authHeader);

        if (resp.success) {
            setNotifications(resp.data);
        } else {
            setError(resp.message);
        }
    }, [authHeader]);


    useEffect(() => {
        refreshNotifications();
    }, [refreshNotifications]);


    return {
        notifications,
        error,
        success,
        isAlert,
    };
};


export default useNotifications;