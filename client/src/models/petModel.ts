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


interface UserPetProfile extends Omit<Pet, 'description' | 'color'> { }

interface PetCreationBody {
  name: string;
  age: number;
  profile_pic: string;
  description: string;
  breed: string;
  color: string;
  owner_id: string;  
}

export type {
  Pet,
  PetProfileUpdateBody,
  UserPetProfile,
  PetCreationBody  
}
