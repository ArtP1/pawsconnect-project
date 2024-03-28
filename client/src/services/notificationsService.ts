import { ApiResponse } from "@/models/apiModel";


const fetchAllUsersNotifications = async (authHeader: string): Promise<ApiResponse> => {
    const response = await fetch("/api/users/notifications", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${authHeader}`
        },
    });

    const data = await response.json();
    return data;
}


export {
    fetchAllUsersNotifications
}