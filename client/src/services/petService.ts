import { ApiResponse } from "@/models/apiModel";

// Source: Fetching Data in React [https://www.youtube.com/watch?v=00lxm_doFYw]

export const getPets = async (): Promise<ApiResponse> => {
  const response = await fetch(`/api/pets`);
  return response.json();
};
