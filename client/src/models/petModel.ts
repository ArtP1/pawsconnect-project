// This represents the API response format (parent interface)
interface Pet { 
  pet_id: string;
  name: string;
  profile_pic: string;
  description: string;
  breed: string;
  color: string;
  age: number;
}

interface PetProfileUpdateBody {
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