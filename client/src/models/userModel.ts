export interface User {
    user_id: BigInt;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    profile_pic: Text;
    location: string;
    preferred_lang: string;
    created_at: EpochTimeStamp;
    updated_at: EpochTimeStamp;
  }
