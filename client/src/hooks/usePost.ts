import { useState, useEffect, useCallback } from "react";
import { fetchPosts, fetchUserPosts, createPost } from "@/services/postService";
import { Post, PostCreationBody } from "@/models/postModel";


const usePost = (authHeader?: string) => {
    const [posts, setPosts] = useState<Post[]>([]);

    const [loadingPosts, setLoadingPosts] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isAlert, setIsAlert] = useState(false);

    const clearNotifications = useCallback(() => {
        setError("");
        setSuccess("");
      }, []);
    

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
        const resp = await fetchUserPosts(authHeader, userId);

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


    const addUserPost = async (postBody: PostCreationBody) => {
        clearNotifications();

        console.log("In addUserPost");
        if (!authHeader) return;

        setLoadingPosts(true);
        const resp = await createPost(authHeader, postBody);

        if (resp.success) {
            // await refreshPosts();
            setIsAlert(true);
            setTimeout(() => setIsAlert(false), 3000);
            setSuccess(resp.message);
        } else {
            setError(resp.message);
        }

        setLoadingPosts(false);
    };


    return {
        posts,
        loadingPosts,
        error,
        success,
        isAlert,
        refreshPosts,
        refreshPostsByUserId,
        addUserPost
    };
};


export default usePost;
