import React from "react";
import { usePets } from "@/hooks/usePets";
import { PetList } from "@/components/petList";


export const PetsPage: React.FC = () => {
  const { pets, loading } = usePets();

  return (
    <div>
      <h1>Pets</h1>
      <br />
      {loading ? 
        <p>Loading...</p> : 
          <PetList pets={pets} />
      }
    </div>
  );
};
