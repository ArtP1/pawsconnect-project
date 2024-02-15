import { Pet } from "../models/petModel";

// Source: Fetching Data in React [https://www.youtube.com/watch?v=00lxm_doFYw]

const BASE_URL = "http://localhost:3000/api/pets";

export const getPets = async (): Promise<Pet[]> => {
  const response = await fetch(BASE_URL);
  return response.json();
};
