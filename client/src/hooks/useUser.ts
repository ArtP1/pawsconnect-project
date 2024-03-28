import { useState, useEffect, useCallback } from "react";
import {
    fetchUserProfile,
    fetchUserFriends,
    updateUserProfile,
    loginUser,
    signupUser,
    fetchUserId,
    fetchAllUsersForSearch,
    acceptFriendReq
} from "@/services/userService"; // adjust the import path as needed
import { UserProfileUpdateBody } from "@/models/userModel";
import { User } from "@/models/userModel";
import { UserSignUp } from "@/models/userModel";
import useNotifications from "./useNotifications";

const useUser = (authHeader?: string) => {
    const { refreshNotifications } = useNotifications(`${authHeader}`);


    const [userProfile, setUserProfile] = useState<User>({} as User);
    const [userFriends, setUserFriends] = useState<User[]>([]);
  
  
    const [userId, setUserId] = useState('');
    const [allUsersForSearch, setAllUsersForSearch] = useState<User[]>([]); 

  
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

    const retrieveAndSetUserId = async () => {
        if (!authHeader) return;

        const resp = await fetchUserId(authHeader); 

        if (resp.success) {
            setUserId(resp.data); 
        } else {
            setError(resp.message);
        }
    };


    useEffect(() => {
        refreshUserProfile();
        refreshUserFriends();
        retrieveAndSetUserId();
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

    const getAllUsersForSearch = useCallback(async () => {
        if(!authHeader) return;

        const resp = await fetchAllUsersForSearch(authHeader);
        
        if(resp.success) {
            setAllUsersForSearch(resp.data);
        } else {
            setError(resp.message);
        }

    }, [authHeader]);
    

    const acceptFriendRequest = async (requesterId : string, notiId: string) => {
        if(!authHeader) return;

        const resp = await acceptFriendReq(authHeader, { requesterId, notiId });

        if(resp.success) {
            setSuccess(resp.message);
            refreshNotifications();
        } else {
            setError(resp.message);
        }
    }


    return {
        login,
        signup,
        userProfile,
        userFriends,
        allUsersForSearch,
        userId,
        loadingProfile,
        loadingFriends,
        error,
        success,
        refreshUserProfile,
        refreshUserFriends,
        retrieveAndSetUserId,
        getAllUsersForSearch,
        acceptFriendRequest,
        updateProfile,
        isAlert,
    };
};


export default useUser;
