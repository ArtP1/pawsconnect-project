import { Pet } from "../models/petModel";

// Source: Fetching Data in React [https://www.youtube.com/watch?v=00lxm_doFYw]

export const getPets = async (): Promise<Pet[]> => {
  const response = await fetch(`/api/pets`);
  return response.json();
};
