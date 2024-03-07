const { executeQuery } = require('../config/utils');

/* 
    If we integrate 'TypeScript' this is what it would allow us to do for all of the models (each with their unique 'interface')
    
    interface User {
        user_id: Integer,
        username: Character Varying,
        password: Character Varying,
        email: Character Varying,
        created_at: TimeStamp,
        profile_picture: Text,
        location: Character Varying
    }


    interface UserRelationship {
        user_id: Integer,
        friend_id: Integer,
        created_at: TimeStamp
    }
 */


const usersModel = {
    getUsers: async () => {
        return await executeQuery('SELECT * FROM \"users\"'); 
        // Expected output: https://drive.google.com/file/d/17OP1E2e4u9R2xMeXNO9k4f0YdhWlmRI8/view?usp=drive_link
    },
    getUserById: async (id) => {
        return await executeQuery(`SELECT * FROM \"users\" WHERE user_id = $1`, [id]); // instead of using ? like in MySQL we use $1, $2, $3 in PostgreSQL
        // Expected output: https://drive.google.com/file/d/1Sh0yW2SxTrNVeAOvam3yoVjSlW7srTjJ/view?usp=drive_link
    },
    getUserByUsername: async (username) => {
        return await executeQuery(`SELECT * FROM \"users\" WHERE username = $1`, [username]);
    },
    getUserFriendsById: async (id) => {
        return await executeQuery(`SELECT * FROM \"userrelationships\" WHERE user_id = $1`, [id]); // instead of using? like in MySQL we use $1, $2, $3 in PostgreSQL
        // Expected output: https://drive.google.com/file/d/12hq6UpLz78d1w5LiWApQErBwspnFLKec/view?usp=drive_link
    },
    getUserByEmail: async(email) => {
        return await executeQuery(`SELECT * FROM \"users\" WHERE email = $1`, [email]);
    },
    createUser: async(firstName, lastName, username, email, hashedPassword) => {
        return await executeQuery(`INSERT INTO \"users\" (first_name, last_name, username, email, password) 
                                   VALUES ($1, $2, $3, $4, $5) RETURNING *`, [firstName, lastName, username, email, hashedPassword]);
    },
    updateUser: async(nFirstName, nlastName, nEmail, nProfilePicture, nlocation, nPrefLang, userId) => {
        const result = await executeQuery(`UPDATE \"users\" SET first_name = $1, last_name = $2, email = $3, 
                                           profile_pic = $4, location = $5, preferred_lang = $6 WHERE user_id = $7 RETURNING *`, 
                                           [nFirstName, nlastName, nEmail, nProfilePicture, nlocation, nPrefLang, userId ]);
        return result.length > 0;
    },
    deleteUserPet: async(petId) => {
        const result = await executeQuery(`DELETE FROM \"pets\" WHERE pet_id = $1 RETURNING *`, [petId]);
        return result.length > 0;
    },
    updateUserPet: async(nName, nAge, nProfilePic, nDescription, nBreed, nColor, petId) => {
        const result = await executeQuery(`UPDATE \"pets\" SET name = $1, age = $2, profile_pic = $3, description = $4, breed = $5, 
                                           color = $6 WHERE pet_id = $7 RETURNING *`, [nName, nAge, nProfilePic, nDescription, nBreed, nColor, petId]);
        return result.length > 0;
    },
    getUserPets: async(id) => {
        return await executeQuery('SELECT pet_id, name, age, profile_pic, description, breed, color FROM \"pets\" WHERE owner_id = $1', [id]);
    },
    addUserPet: async (name, age, profilePic, description, breed, color, ownerId) => {
       const result =  executeQuery(`INSERT INTO \"pets\" (name, age, profile_pic, description, breed, color, owner_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [name, age, profilePic, description, breed, color, ownerId]);
        return result.length > 0;
    }
}


module.exports = usersModel;