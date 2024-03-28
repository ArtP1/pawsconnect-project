import { UserProfileUpdateBody } from "@/models/userModel";
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


const updateUserProfile = async (authHeader: string, body: UserProfileUpdateBody): Promise<ApiResponse> => {
    const response = await fetch("/api/users/profile/update", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authHeader}`
        },
        body: JSON.stringify(body)
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


const fetchUserId = async (authHeader: string): Promise<ApiResponse> => {
    const response = await fetch(`/api/users/id`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${authHeader}`
        }
    });

    const data = await response.json();
    return data;
}


const fetchAllUsersForSearch = async (authHeader: string): Promise<ApiResponse> => {
    const response = await fetch("/api/users?usage=search", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${authHeader}`
        },
    });

    const data = await response.json();
    return data;
}


const acceptFriendReq = async (authHeader: string, body: { requesterId: string, notiId: string }): Promise<ApiResponse> => {
    const response = await fetch(`/api/users/friends/accept`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${authHeader}`
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    return data;
}


const createPetTransferReq = async (authHeader: string, body: { nextOwnerId: string, petId: string}): Promise<ApiResponse> => {
    const response = await fetch(`/api/users/pet/transfer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${authHeader}`
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    return data;
}


export {
    loginUser,
    signupUser,
    fetchUserProfile,
    updateUserProfile,
    fetchUserFriends,
    fetchUserId,
    fetchAllUsersForSearch,
    acceptFriendReq,
    createPetTransferReq
}