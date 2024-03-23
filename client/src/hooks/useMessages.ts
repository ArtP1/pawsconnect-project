import { useState, useCallback, useEffect } from 'react';
import {
    createConvo,
    fetchUserConvoMsgs,
    fetchUserConvos,
    createMsg,
    updateMsgReadState,
} from '@/services/msgService';
import { UserConvSnippet, Message } from '@/models/msgModel';


const useMessages = (authHeader?: string) => {
    const [userConvos, setUserConvos] = useState<UserConvSnippet[]>([]);
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


    const refreshUserConvoMsgs = useCallback(async (otherUserId: string) => {
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


    const createConversation = async (nReceiverId: string, nMsgText: string) => {
        if (!authHeader) return;

        const resp = await createConvo(authHeader, { nReceiverId,  nMsgText });
        // const msgResp = await createMsg(authHeader, {nReceiverId, nMsgText});

        if (resp.success) {
            setIsAlert(true);
            setTimeout(() => setIsAlert(false), 3000);
            setSuccess(resp.message);
        } else {
            setError(resp.message);
        }
    }


    const createMessage = async (convoId: string, nReceiverId: string, nMsgText: string) => {
        if (!authHeader) return;

        const resp = await createMsg(authHeader, {convoId, nReceiverId, nMsgText});
        
        if(resp.success) {
            setIsAlert(true);
            setTimeout(() => setIsAlert(false), 3000);
            setSuccess(resp.message);
        } else {
            setError(resp.message);
        }
    }

    
    const markMsgsAsRead = async (convoId: string) => {
        if(!authHeader) return;

        await updateMsgReadState(authHeader, { convoId });
    }


    return {
        userConvos,
        userConvoMsgs,
        refreshUserConvos,
        refreshUserConvoMsgs,
        createConversation,
        createMessage,
        markMsgsAsRead,
        loadingConvos,
        error,
        success,
        isAlert
    }
}

export default useMessages;