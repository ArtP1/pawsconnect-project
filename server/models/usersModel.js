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
    getUserFriendsById: async (id) => {
        return await executeQuery(`SELECT * FROM \"userrelationships\" WHERE user_id = $1`, [id]); // instead of using? like in MySQL we use $1, $2, $3 in PostgreSQL
        // Expected output: https://drive.google.com/file/d/12hq6UpLz78d1w5LiWApQErBwspnFLKec/view?usp=drive_link
    }
}


module.exports = usersModel;