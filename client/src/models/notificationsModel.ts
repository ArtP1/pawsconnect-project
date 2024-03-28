type NotificationType = 'info' | 'f-request' | 't-request' | 'post-l' | 'post-c' | 'success' | 'warning' | 'default';


interface Notification {
    noti_id: string;
    title: string;
    sub_heading: string;
    type: NotificationType;
    is_read: boolean;
    created_at: string;
    post_id?: string;
    ref_user_id?: string;
    pet_id?: string;
    content?: string;
    ref_username?: string;
}


export type { Notification };