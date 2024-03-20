interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  email?: string;
  password?: string;
  profile_pic: string;
  location: string;
  preferred_lang?: string;
  created_at?: EpochTimeStamp;
  updated_at?: EpochTimeStamp;
}


interface UserProfileUpdateBody {
  nFirstName: string;
  nLastName: string;
  nEmail: string;
  nProfilePicture: string;
  nLocation: string;
  nPrefLang: string;
}


interface UserSignUp extends Omit<User, "user_id" | "profile_pic" | "location" | "preferred_lang"> { }


export type { User, UserProfileUpdateBody, UserSignUp };
