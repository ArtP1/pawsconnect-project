import { StringToBoolean } from "class-variance-authority/types";

interface Message {
    msg_id?: string;
    convo_id: string;
    sender_id: string;
    receiver_id: string;
    message_txt: string;
    timestamp: Date;
    is_read?: boolean;
}


interface Conversation {
    convo_id: string;
    participant_two: string;
    latest_msg_id: string;
    latest_msg_timestamp: string;
    created_at?: string;
    updated_at?: string;
}


interface UserConvSnippet extends Message {
    receiver_username: string;
    receiver_profile_pic: string;
    message_direction: 'sent' | 'received';
}


interface NewMessage {
    convoId: string;
    nReceiverId: string;
    nMsgText: string;
}


export type {
    Message,
    UserConvSnippet,
    NewMessage
};
