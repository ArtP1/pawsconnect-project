import { ApiResponse } from "@/models/apiModel";
import { NewMessage } from "@/models/msgModel";


const createConvo = async (authHeader: string, body: { nReceiverId: string, nMsgText: string }): Promise<ApiResponse> => {
    const response = await fetch("/api/users/create/convo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${authHeader}`
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    return data;
}


const createMsg = async (authHeader: string, body: NewMessage): Promise<ApiResponse> => {
    const response = await fetch("/api/users/create/msg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${authHeader}`
        },
        body: JSON.stringify(body)
    });

    const data = response.json();
    return data;
}


const fetchUserConvos = async (authHeader: string): Promise<ApiResponse> => {
    const response = await fetch("/api/users/convos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${authHeader}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        return errorData;
    }

    const data = await response.json();
    return data;
}


const fetchUserConvoMsgs = async (authHeader: string, otherUserId: string): Promise<ApiResponse> => {
    const response = await fetch(`/api/users/convo/messages/${otherUserId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${authHeader}`
        }
    });

    const data = await response.json();
    return data;
}


const updateMsgReadState = async (authHeader: string, body: { convoId: string }): Promise<ApiResponse> => {
    const response = await fetch("/api/users/convo/messages/read", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${authHeader}`
        },
        body: JSON.stringify(body)
    });

    const data = response.json();
    return data;
}


export {
    createConvo, 
    fetchUserConvos,
    fetchUserConvoMsgs,
    createMsg,
    updateMsgReadState
}