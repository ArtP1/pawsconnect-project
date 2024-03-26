interface Notification {
    noti_id: string;
    title: string;
    sub_heading: string;
    content: string;
    type: 'info' | 'success' | 'warning';
    is_read: boolean;
    created_at: string;
}


export type { Notification };