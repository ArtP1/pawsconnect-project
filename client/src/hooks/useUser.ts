import { useState, useEffect, useCallback } from "react";
import {
    fetchUserProfile,
    fetchUserFriends,
    updateUserProfile,
    loginUser,
    signupUser,
} from "@/services/userService"; // adjust the import path as needed
import { UserProfileUpdateBody } from "@/models/userModel";
import { User } from "@/models/userModel";
import { UserSignUp } from "@/models/userModel";


const useUser = (authHeader?: string) => {
    const [userProfile, setUserProfile] = useState<User>({} as User);
    const [userFriends, setUserFriends] = useState<User[]>([]);

    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingFriends, setLoadingFriends] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isAlert, setIsAlert] = useState(false);


    const clearNotifications = useCallback(() => {
        setError("");
        setSuccess("");
    }, []);

    const refreshUserProfile = useCallback(async () => {
        if (!authHeader) return;

        setLoadingProfile(true);
        const resp = await fetchUserProfile(authHeader);

        if (resp.success) {
            setUserProfile(resp.data[0]);
        } else {
            setError(resp.message);
        }

        setLoadingProfile(false);
    }, [authHeader]);

    const refreshUserFriends = useCallback(async () => {
        if (!authHeader) return;

        setLoadingFriends(true);
        const resp = await fetchUserFriends(authHeader);
        if (resp.success) {
            setUserFriends(resp.data);
        } else {
            setError(resp.message);
        }

        setLoadingFriends(false);
    }, [authHeader]);

    useEffect(() => {
        refreshUserProfile();
        refreshUserFriends();
    }, [authHeader, refreshUserProfile, refreshUserFriends]);

    const login = async (email: string, password: string) => {
        setLoadingProfile(true);
        const response = await loginUser(email, password);

        if (response.success) {
            setLoadingProfile(false);
            return response;
        } else {
            setError(response.message);
            setLoadingProfile(false);
        }
    };

    const signup = async (signUpBody: UserSignUp) => {
        return await signupUser(signUpBody);
    };

    const updateProfile = async (updateBody: UserProfileUpdateBody) => {
        clearNotifications();

        if (!authHeader) return;

        setLoadingProfile(true);
        const resp = await updateUserProfile(authHeader, updateBody);
        console.log(resp.message);
        if (resp.success) {
            setUserProfile(resp.data);
            setIsAlert(true);
            setTimeout(() => setIsAlert(false), 3000);
            setSuccess(resp.message);
        } else {
            setError(resp.message);
        }

        setLoadingProfile(false);
    };

    return {
        login,
        signup,
        userProfile,
        userFriends,
        loadingProfile,
        loadingFriends,
        error,
        success,
        refreshUserProfile,
        refreshUserFriends,
        updateProfile,
        isAlert,
    };
};


export default useUser;
