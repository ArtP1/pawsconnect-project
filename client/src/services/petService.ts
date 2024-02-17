import { Pet } from "../models/petModel";
import { configs }  from "@/configs";
const BASE_URL = configs.api.BASE_URL;

// Source: Fetching Data in React [https://www.youtube.com/watch?v=00lxm_doFYw]

export const getPets = async (): Promise<Pet[]> => {
  const response = await fetch(`${BASE_URL}/pets`);
  return response.json();
};
