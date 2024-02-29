import { UserProfileUpdateBody } from "@/models/userModel";
import { PetProfileUpdateBody } from "@/models/petModel";
import { ApiResponse } from "@/models/apiModel";
import { UserSignUp } from "@/models/userModel";


const loginUser = async (email: string, password: string): Promise<ApiResponse> => {
    const response = await fetch("/api/users/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    return data;
};

const signupUser = async (body: UserSignUp): Promise<ApiResponse> => {
    const { first_name, last_name, username, email, password  } = body;

    const response = await fetch("/api/users/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, 
            last_name, 
            username, 
            email, 
            password 
        })
    });

    const data = await response.json();

    return data;
};

const fetchUserProfile = async (authHeader: string): Promise<ApiResponse> => {
    const response = await fetch("/api/users/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${authHeader}`
        }
    });

    const data = await response.json();

    return data;
};


const fetchUserPets = async (authHeader: string): Promise<ApiResponse> => {
    const response = await fetch("/api/users/pets", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${authHeader}`
        }
    });

    const data = await response.json();

    return data;
}


const updateUserProfile = async (authHeader: string, body: UserProfileUpdateBody): Promise<ApiResponse> => {
    const { nFirstName, nLastName, nEmail, nProfilePicture, nLocation, nPrefLang } = body;

    const response = await fetch("/api/users/profile/update", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authHeader}`
        },
        body: JSON.stringify({
            nFirstName,
            nLastName,
            nEmail,
            nProfilePicture,
            nLocation,
            nPrefLang
        })
    });

    const data = await response.json();

    return data;
}


const updateUserPet = async (authHeader: string, body: PetProfileUpdateBody): Promise<ApiResponse> => {
    const { nName, nAge, nProfilePic, nDescription, nBreed, nColor } = body;

    const response = await fetch(`/api/users/pets/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: JSON.stringify({
            nName,
            nAge,
            nProfilePic,
            nDescription,
            nBreed,
            nColor
        })
    });

    const data = await response.json();

    return data;
}


const deleteUserPet = async (authHeader: string, body: {petId: string}): Promise<ApiResponse> => {
    const { petId } = body;

    const response = await fetch(`/api/users/pets/delete?petId=${petId}`, {
        method: 'GET',
        headers: {
            'Authorization': authHeader
        }
    });

    const data = await response.json();

    return data;
}


export {
    loginUser,
    signupUser,
    fetchUserProfile,
    fetchUserPets,
    updateUserProfile,
    deleteUserPet,
    updateUserPet
}