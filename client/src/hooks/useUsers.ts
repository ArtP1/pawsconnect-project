import { useState, useEffect, useCallback } from 'react';
import { fetchUserProfile, fetchUserPets, updateUserProfile, 
         deleteUserPet, updateUserPet, addUserPet } from '@/services/userService'; // adjust the import path as needed
import { UserProfileUpdateBody } from '@/models/userModel';
import { PetCreationBody, PetProfileUpdateBody } from '@/models/petModel';
import { Pet } from '@/models/petModel';
import { User } from '@/models/userModel';
import { loginUser, signupUser } from '@/services/userService';
import { UserSignUp } from '@/models/userModel';


const useUser = (authHeader?: string) => {
    const [isAlert, setIsAlert] = useState(false);

    const [userProfile, setUserProfile] = useState<User>({} as User);
    const [userPets, setUserPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); 

    const clearNotifications = useCallback(() => {
        setError('');
        setSuccess('');
    }, []);


    const refreshUserProfile = useCallback(async () => {
        if (!authHeader) {
            setLoading(false);
            return;
        } 

        setLoading(true);
        const resp = await fetchUserProfile(authHeader);

        if(resp.success) {
            setUserProfile(resp.data[0]);
        } else {
            setError(resp.message);
        }

        setLoading(false);

    }, [authHeader]);

    const refreshUserPets = useCallback(async () => {
        if (!authHeader) {
            setLoading(false);
            return;
        } 

        setLoading(true);
        const resp = await fetchUserPets(authHeader);
        
        if(resp.success) {
            setUserPets(resp.data.pets); 
        } else {
            setError(resp.message);
        }

        setLoading(false);

    }, [authHeader]);

    
    useEffect(() => {
        refreshUserProfile();
        refreshUserPets();
    }, [authHeader, refreshUserProfile, refreshUserPets]);


    const login = async (email: string, password: string) => {
        setLoading(true);
        const response = await loginUser(email, password);

        if(response.success) {
            setLoading(false);
            return response;
        } else {
            setError(response.message);
        }

        setLoading(false);
    };
    
    const signup = async (signUpBody: UserSignUp) => {
        return await signupUser(signUpBody);
    };

    const updateProfile = async (updateBody: UserProfileUpdateBody) => {
        clearNotifications();

        if (!authHeader) return; 

        setLoading(true);
        const resp = await updateUserProfile(authHeader, updateBody);

        if(resp.success) {
            setUserProfile(resp.data);
            setIsAlert(true);
            setTimeout(() => setIsAlert(false), 3000);
            setSuccess(resp.message); 
        } else {
            setError(resp.message);
        }

        setLoading(false);
    };

    const updatePet = async (petBody: PetProfileUpdateBody) => {
        clearNotifications();

        if (!authHeader) return; 

        setLoading(true);
        const resp = await updateUserPet(authHeader, petBody);

        if(resp.success) {
            refreshUserPets(); 
            setIsAlert(true);
            setTimeout(() => setIsAlert(false), 3000);
            setSuccess(resp.message); 
        } else {
            setError(resp.message);
        }

        setLoading(false);
    };

    const deletePet = async (petId: string) => {
        clearNotifications();

        if (!authHeader) return; 
        
        setLoading(true);
        const resp = await deleteUserPet(authHeader, { petId });

        if(resp.success) {
            const updatedPets = userPets.filter(pet => pet.pet_id !== petId);
            setUserPets(updatedPets); 
            setIsAlert(true);
            setTimeout(() => setIsAlert(false), 3000);
            setSuccess(resp.message);
        } else {
            setError(resp.message);
        }

        setLoading(false);
    };
    const addNewPet = async (petBody: PetCreationBody) => {
        if (!authHeader) return; // Ensure there's an authentication header
    
        setLoading(true);
        clearNotifications();
    
        // Correctly pass authHeader and petBody as two separate arguments
        const resp = await addUserPet(authHeader, petBody);
    
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
        userPets,
        loading,
        error,
        success,
        refreshUserProfile,
        refreshUserPets,
        updateProfile,
        updatePet,
        deletePet,
        addNewPet, 
        isAlert
    };
};

export default useUser;
