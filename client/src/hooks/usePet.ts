import { useState, useEffect, useCallback } from "react";
import {
  fetchUserPets,
  deleteUserPet,
  updateUserPet,
  addUserPet,
} from "@/services/petService"; // adjust the import path as needed
import { PetCreationBody, PetProfileUpdateBody } from "@/models/petModel";
import { Pet } from "@/models/petModel";

const usePet = (authHeader?: string) => {
  const [userPets, setUserPets] = useState<Pet[]>([]);

  const [loadingPets, setLoadingPets] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAlert, setIsAlert] = useState(false);


  const clearNotifications = useCallback(() => {
    setError("");
    setSuccess("");
  }, []);


  const refreshUserPets = useCallback(async () => {
    if (!authHeader) return;

    setLoadingPets(true);
    const resp = await fetchUserPets(authHeader);

    console.log();
    if (resp.success) {
      setUserPets(resp.data.pets);
    } else {
      setError(resp.message);
    }

    setLoadingPets(false);
  }, [authHeader]);


  useEffect(() => {
    refreshUserPets();
  }, [authHeader, refreshUserPets]);


  const updatePet = async (petBody: PetProfileUpdateBody) => {
    clearNotifications();

    if (!authHeader) return;

    setLoadingPets(true);
    const resp = await updateUserPet(authHeader, petBody);

    if (resp.success) {
      refreshUserPets();
      setIsAlert(true);
      setTimeout(() => setIsAlert(false), 3000);
      setSuccess(resp.message);
    } else {
      setError(resp.message);
    }

    setLoadingPets(false);
  };


  const deletePet = async (petId: string) => {
    clearNotifications();

    if (!authHeader) return;

    setLoadingPets(true);
    const resp = await deleteUserPet(authHeader, { petId });

    if (resp.success) {
      const updatedPets = userPets.filter((pet) => pet.pet_id !== petId);
      setUserPets(updatedPets);
      setIsAlert(true);
      setTimeout(() => setIsAlert(false), 3000);
      setSuccess(resp.message);
    } else {
      setError(resp.message);
    }

    setLoadingPets(false);
  };


  const addNewPet = async (petBody: PetCreationBody) => {
    if (!authHeader) return;

    setLoadingPets(true);
    clearNotifications();

    const resp = await addUserPet(authHeader, petBody);

    if (resp.success) {
      await refreshUserPets();
      setIsAlert(true);
      setTimeout(() => setIsAlert(false), 3000);
      setSuccess("Pet added successfully!");
    } else {
      setError(resp.message);
    }

    setLoadingPets(false);
  };


  return {
    userPets,
    loadingPets,
    error,
    success,
    isAlert,
    refreshUserPets,
    updatePet,
    deletePet,
    addNewPet,
  };
};


export default usePet;
