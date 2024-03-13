import { useState, useEffect, useCallback } from "react";
import {
    fetchUserProfile,
    fetchUserPets,
    updateUserProfile,
    deleteUserPet,
    updateUserPet, addUserPet,
    // fetchUserFriends
} from "@/services/userService"; // adjust the import path as needed
import { UserProfileUpdateBody } from "@/models/userModel";
import { PetCreationBody, PetProfileUpdateBody } from "@/models/petModel";
import { Pet } from "@/models/petModel";
import { User } from "@/models/userModel";
import { loginUser, signupUser } from "@/services/userService";
import { UserSignUp } from "@/models/userModel";

const useUser = (authHeader?: string) => {
    const [isAlert, setIsAlert] = useState(false);

    const [userProfile, setUserProfile] = useState<User>({} as User);
    const [userFriends, setUserFriends] = useState<User[]>([]);
    const [userPets, setUserPets] = useState<Pet[]>([]);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingFriends, setLoadingFriends] = useState(false);
    const [loadingPets, setLoadingPets] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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

    const refreshUserPets = useCallback(async () => {
        if (!authHeader) return;

        setLoadingPets(true);
        const resp = await fetchUserPets(authHeader);

        if (resp.success) {
            setUserPets(resp.data.pets);
        } else {
            setError(resp.message);
        }

        setLoadingPets(false);
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
        refreshUserPets();
        refreshUserFriends();
    }, [authHeader, refreshUserProfile, refreshUserPets, refreshUserFriends]);

    const login = async (email: string, password: string) => {
        setLoadingProfile(true);
        const response = await loginUser(email, password);

        if (response.success) {
            setLoadingProfile(false);
            return response;
        } else {
            setError(response.message);
        }

        setLoadingProfile(false);
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

    const updatePet = async (petBody: PetProfileUpdateBody) => {
        clearNotifications();

        if (!authHeader) return;

        setLoadingPets(true);
        const resp = await updateUserPet(authHeader, petBody);

        if (resp.success) {
            refreshUserPets();
            setIsAlert(true);
            setTimeout(() => setIsAlert(false), 3000);
            setSuccess(resp.message);
        } else {
            setError(resp.message);
        }

        setLoadingPets(false);
    };

    const deletePet = async (petId: string) => {
        clearNotifications();

        if (!authHeader) return;

        setLoadingPets(true);
        const resp = await deleteUserPet(authHeader, { petId });

        if (resp.success) {
            const updatedPets = userPets.filter((pet) => pet.pet_id !== petId);
            setUserPets(updatedPets);
            setIsAlert(true);
            setTimeout(() => setIsAlert(false), 3000);
            setSuccess(resp.message);
        } else {
            setError(resp.message);
        }

        setLoadingPets(false);
    };
    const addNewPet = async (petBody: PetCreationBody) => {
        if (!authHeader) return; // Ensure there's an authentication header
    
        setLoading(true);
        clearNotifications();
    
        // Correctly pass authHeader and petBody as two separate arguments
        const resp = await addUserPet(authHeader,petBody);
    
        if (resp.success) {
            // Optionally refresh the list of user pets after successfully adding a new pet
            await refreshUserPets();
            setIsAlert(true);
            setTimeout(() => setIsAlert(false), 3000);
            setSuccess('Pet added successfully!');
        } else {
            setError(resp.message || 'Failed to add pet');
        }
    
        setLoading(false);
    };






    return {
        login,
        signup,
        userProfile,
        userFriends,
        userPets,
        loadingProfile,
        loadingFriends,
        loadingPets,
        error,
        success,
        refreshUserProfile,
        refreshUserPets,
        refreshUserFriends,
        updateProfile,
        updatePet,
        deletePet,
        addNewPet, 
        isAlert,
    };
};

export default useUser;
