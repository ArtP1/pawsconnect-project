interface Post {
    post_id: number;
    user_id: number;
    content: string;
    caption: string;
    visibility: string;
    created_at: string;
    updated_at: string;
}

interface PostCreationBody {
    user_id: number;
    content: string;
    caption: string;
    visibility: string;
}


export type {Post, PostCreationBody};