import React from "react";
import { Pet } from "../models/petModel";
import "./css/petList.css"

interface PetListProps {
  pets: Pet[];
}

    
export const PetList: React.FC<PetListProps> = ({ pets }) => (
  <ul className="petList">
    {pets.map(pet => (
      <li key={pet.pet_id}>
        <figure className="petPhoto">
          <img src={pet.profile_picture} alt="doggo"/>
          <figcaption>{pet.name} - {pet.breed}</figcaption>
        </figure>
      </li>
    ))}
  </ul>
);
