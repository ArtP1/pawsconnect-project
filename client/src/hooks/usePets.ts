// Each hook should be treated indivividually, meaning each should have thier own file
import { useState, useEffect } from "react";
import { Pet } from "../models/petModel";
import * as petsService from "../services/petService";


// Source: Fetching Data in React [https://www.youtube.com/watch?v=00lxm_doFYw]
export const usePets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      const pets = await petsService.getPets();
      setPets(pets);
      setLoading(false);
    };

    fetchPets();
  }, []);

  return { pets, loading };
};
