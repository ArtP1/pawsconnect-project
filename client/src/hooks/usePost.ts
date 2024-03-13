import { useState, useEffect, useCallback } from "react";
import { fetchPosts, fetchPostsByUserId, createPost } from "@/services/postService";
import { Post } from "@/models/postModel";

const usePost = (authHeader?: string) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const refreshPosts = useCallback(async () => {
        if (!authHeader) return;

        setLoadingPosts(true);
        const resp = await fetchPosts(authHeader);

        if (resp.success) {
            setPosts(resp.data);
        } else {
            setError(resp.message);
        }

        setLoadingPosts(false);
    }, [authHeader]);

    const refreshPostsByUserId = useCallback(async (userId: number) => {
        if (!authHeader) return;

        setLoadingPosts(true);
        const resp = await fetchPostsByUserId(authHeader, userId);

        if (resp.success) {
            setPosts(resp.data);
        } else {
            setError(resp.message);
        }

        setLoadingPosts(false);
    }, [authHeader]);

    useEffect(() => {
        refreshPosts();
    }, [authHeader, refreshPosts]);

    const addNewPost = async (postBody: Omit<Post, 'post_id' | 'created_at' | 'updated_at'>) => {
        if (!authHeader) return;

        setLoadingPosts(true);
        setError("");
        setSuccess("");

        const resp = await createPost(authHeader, postBody);

        if (resp.success) {
            await refreshPosts();
            setSuccess("Post created successfully!");
        } else {
            setError(resp.message || "Failed to create post");
        }

        setLoadingPosts(false);
    };

    return {
        posts,
        loadingPosts,
        error,
        success,
        refreshPosts,
        refreshPostsByUserId,
        addNewPost,
    };
};

export default usePost;
