import { UserProfileUpdateBody } from "@/models/userModel";
import { PetCreationBody, PetProfileUpdateBody } from "@/models/petModel";
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

    if (!response.ok) {
        const errorData = await response.json();
        return errorData;
    }

    const data = await response.json();

    return data;
};

const signupUser = async (body: UserSignUp): Promise<ApiResponse> => {
    const { first_name, last_name, username, email, password } = body;

    const response = await fetch("/api/users/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName: first_name,
            lastName: last_name,
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

    if (!response.ok) {
        const errorData = await response.json();
        return errorData;
    }

    const data = await response.json();

    return data;
}

const fetchUserFriends = async (authHeader: string): Promise<ApiResponse> => {
    const response = await fetch("/api/users/friends", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${authHeader}`
        }
    });

    const data = await response.json();
    return data;
}

const updateUserPet = async (authHeader: string, body: PetProfileUpdateBody): Promise<ApiResponse> => {
    const { petId, nName, nAge, nProfilePic, nDescription, nBreed, nColor } = body;

    const response = await fetch("/api/users/pets/update", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: JSON.stringify({
            petId,
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


const deleteUserPet = async (authHeader: string, body: { petId: string }): Promise<ApiResponse> => {
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
const addUserPet = async (authHeader: string, body: PetCreationBody): Promise<ApiResponse> => {
    console.log(body);
    console.log(authHeader);
    const { name, age, profile_pic, description, breed, color, owner_id } = body;

    const response = await fetch("/api/users/pets/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authHeader}`
        },
        body: JSON.stringify({
            name,
            age,
            profile_pic,
            description,
            breed,
            color,
            owner_id 
        })
    });
    
    

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        // Handle errors, e.g., by throwing an error or returning a custom error object
        console.error('Failed to add pet:', response.statusText);
        return { success: false, message: `Error: ${response.statusText}` };
    }
};


export {
    loginUser,
    signupUser,
    fetchUserProfile,
    fetchUserPets,
    updateUserProfile,
    deleteUserPet,
    updateUserPet,
    addUserPet,
    fetchUserFriends
}