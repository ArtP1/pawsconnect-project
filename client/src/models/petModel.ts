// This represents the API response format (parent interface)
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
interface UserPetProfile extends Omit<Pet, 'description' | 'color'> { 

}

export type {
  Pet,
  PetProfileUpdateBody,
  UserPetProfile
}