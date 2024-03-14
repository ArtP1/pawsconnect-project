import { ApiResponse } from "@/models/apiModel";
import { PetCreationBody, PetProfileUpdateBody } from "@/models/petModel";


const fetchUserPets = async (authHeader: string): Promise<ApiResponse> => {
    const response = await fetch("/api/pets/user-pets", {
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

    const response = await fetch("/api/pets/update", {
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

    const response = await fetch(`/api/pets/delete?petId=${petId}`, {
        method: 'GET',
        headers: {
            'Authorization': authHeader
        }
    });

    const data = await response.json();

    return data;
}


const addUserPet = async (authHeader: string, body: PetCreationBody): Promise<ApiResponse> => {
    const { name, age, profile_pic, description, breed, color  } = body;

    const response = await fetch("/api/pets/add", {
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
            color
        })
    });

    const data = await response.json();

    return data;
};


export {
    fetchUserPets,
    updateUserPet,
    deleteUserPet,
    addUserPet
}