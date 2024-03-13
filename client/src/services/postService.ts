import { ApiResponse } from "@/models/apiModel";
import { PostCreationBody } from "@/models/postModel";

const fetchPosts = async (authHeader: string): Promise<ApiResponse> => {
    const response = await fetch("/api/posts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${authHeader}`
        }
    });

    const data = await response.json();

    return data;
};

const fetchPostsByUserId = async (authHeader: string, user_id: number): Promise<ApiResponse> => {
    const response = await fetch(`/api/posts/${user_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${authHeader}`
        }
    });

    const data = await response.json();

    return data;
};

const createPost = async (authHeader: string, body: PostCreationBody): Promise<ApiResponse> => {
    const response = await fetch("/api/posts/create", {
        method: 'POST',
        headers: {
            'Authorization': `${authHeader}`
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    return data;
};

export {
    fetchPosts,
    fetchPostsByUserId,
    createPost
};
