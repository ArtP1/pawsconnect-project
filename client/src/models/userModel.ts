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
  created_at?: string;
  updated_at?: string;
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


interface UserSignUp extends Omit<User, "user_id" | "profile_pic" | "location" | "preferred_lang"> { }


interface UserSnippet extends Omit<User, "email" | "password" | "location" | "preferred_lang"> { }


export type { User, 
              UserProfileUpdateBody, 
              UserSignUp, 
              UserSnippet };