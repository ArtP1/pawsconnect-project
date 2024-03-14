interface Post {
    post_id: number;
    user_id: number;
    content: string;
    caption: string;
    visibility: string;
    created_at: string;
    updated_at: string;
}

interface PostCreationBody extends Omit<Post, "post_id" | "user_id" | "created_at" | "updated_at"> { }


export type {Post, PostCreationBody};