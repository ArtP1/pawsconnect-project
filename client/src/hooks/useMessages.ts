import { useState, useCallback, useEffect } from 'react';
import { fetchUserConvoMsgs, fetchUserConvos } from "@/services/userService";
import { UserConvMessage, Message} from '@/models/messageModel';


const useMessages = (authHeader?: string) => {
    const [userConvos, setUserConvos] = useState<UserConvMessage[]>([]);
    const [userConvoMsgs, setUserConvoMsgs] = useState<Message[]>([]);
    

    const [loadingConvos, setLoadingConvos] = useState(false);
    const [loadingConvoMsgs, setLoadingConvoMsgs] = useState(false);
    

    const [error, setError] = useState('');
    const [success, setSuccess] = useState("");
    const [isAlert, setIsAlert] = useState(false);


    const clearNotifications = useCallback(() => {
        setError("");
        setSuccess("");
    }, []);


    const refreshUserConvos = useCallback(async () => {
        if (!authHeader) return;

        setLoadingConvos(true);
        const resp = await fetchUserConvos(authHeader);

        if (resp.success) {
            setUserConvos(resp.data);
        } else {
            setError(resp.message);
        }

        setLoadingConvos(false);
    }, [authHeader]);

    
    const refreshUserConvoMsgs = useCallback(async (otherUserId: number) => {
        if (!authHeader || !otherUserId) return;

        setLoadingConvoMsgs(true);
        const resp = await fetchUserConvoMsgs(authHeader, otherUserId);
        if (resp.success) {
            setUserConvoMsgs(resp.data);
        } else {
            setError(resp.message);
        }
        setLoadingConvoMsgs(false);
    }, [authHeader]);


    useEffect(() => {
        refreshUserConvos();
    }, [authHeader, refreshUserConvos]);


    return {
        userConvos,
        userConvoMsgs,
        refreshUserConvos,
        refreshUserConvoMsgs,
        loadingConvos,
        error,
        success,
        isAlert
    }
}

export default useMessages;