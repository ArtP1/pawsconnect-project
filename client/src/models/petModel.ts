interface Pet { 
  pet_id: string;
  name: string;
  age: number;
  profile_pic: string;
  description: string;
  breed: string;
  color: string;
}

interface PetProfileUpdateBody {
  petId: string,
  nName: string;
  nAge: number;
  nProfilePic: string;
  nDescription: string;
  nBreed: string;
  nColor: string;
}

// Used within the ManageProfile page
// Excludes 'description', 'color'
interface UserPetProfile extends Omit<Pet, 'description' | 'color'> { }

// Define a new interface for the request body when creating a new pet
interface PetCreationBody {
  name: string;
  age: number;
  profilePic: string;
  description: string;
  breed: string;
  color: string;
  ownerId: string;  // Include the ownerId to associate the pet with its owner
}

export type {
  Pet,
  PetProfileUpdateBody,
  UserPetProfile,
  PetCreationBody  
}
