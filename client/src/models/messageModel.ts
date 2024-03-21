interface Message {
    msg_id: number;
    sender_id: number;
    receiver_id: number;
    message_txt: string;
    timestamp: Date;
    is_read: boolean;
}


interface UserConvMessage extends Message {
    receiver_username: string;
    receiver_profile_pic: string;
    message_direction: 'sent' | 'received';
}


export type { Message, UserConvMessage};
