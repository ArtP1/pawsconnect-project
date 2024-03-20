const { executeQuery } = require("../config/utils");

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
    return await executeQuery('SELECT * FROM "users"');
    // Expected output: https://drive.google.com/file/d/17OP1E2e4u9R2xMeXNO9k4f0YdhWlmRI8/view?usp=drive_link
  },
  getFriends: async (id) => {
    return await executeQuery(
      'SELECT u.user_id, u.first_name, u.last_name, u.username, u.profile_pic, u.location FROM "users" u ' +
        'JOIN "userrelationships" ur ' +
        "ON u.user_id = ur.friend_id WHERE ur.user_id = $1",
      [id]
    );
  },
  getUserById: async (id) => {
    return await executeQuery(`SELECT * FROM \"users\" WHERE user_id = $1`, [
      id,
    ]); // instead of using ? like in MySQL we use $1, $2, $3 in PostgreSQL
    // Expected output: https://drive.google.com/file/d/1Sh0yW2SxTrNVeAOvam3yoVjSlW7srTjJ/view?usp=drive_link
  },
  getUserByUsername: async (username) => {
    return await executeQuery(`SELECT * FROM \"users\" WHERE username = $1`, [
      username,
    ]);
  },
  getUserFriendsById: async (id) => {
    return await executeQuery(
      `SELECT * FROM \"userrelationships\" WHERE user_id = $1`,
      [id]
    ); // instead of using? like in MySQL we use $1, $2, $3 in PostgreSQL
    // Expected output: https://drive.google.com/file/d/12hq6UpLz78d1w5LiWApQErBwspnFLKec/view?usp=drive_link
  },
  getUserByEmail: async (email) => {
    return await executeQuery(`SELECT * FROM \"users\" WHERE email = $1`, [
      email,
    ]);
  },
  getUserMessages: async (id) => {
    return await executeQuery(
    `
        WITH RankedMessages AS (
            SELECT 
                m.msg_id, 
                m.sender_id, 
                m.receiver_id, 
                m.message_txt,
                m.timestamp, 
                m.is_read, 
                u.username AS receiver_username, 
                u.profile_pic AS receiver_profile_pic,
                ROW_NUMBER() OVER (
                    PARTITION BY CASE WHEN m.sender_id = $1 THEN m.receiver_id ELSE m.sender_id END 
                    ORDER BY m.timestamp DESC
                ) AS rn 
            FROM "messages" m 
            JOIN users u ON m.receiver_id = u.user_id 
            WHERE m.sender_id = $1 OR m.receiver_id = $1
        )
        SELECT 
            msg_id, 
            sender_id, 
            receiver_id, 
            message_txt, 
            timestamp, 
            is_read, 
            receiver_username, 
            receiver_profile_pic 
        FROM RankedMessages 
        WHERE rn = 1 
        ORDER BY timestamp DESC
    `,
      [id]
    );
  },
  createUser: async (firstName, lastName, username, email, hashedPassword) => {
    return await executeQuery(
      `INSERT INTO \"users\" (first_name, last_name, username, email, password) 
                                   VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [firstName, lastName, username, email, hashedPassword]
    );
  },
  updateUser: async (
    nFirstName,
    nlastName,
    nEmail,
    nProfilePicture,
    nlocation,
    nPrefLang,
    userId
  ) => {
    const result = await executeQuery(
      `UPDATE \"users\" SET first_name = $1, last_name = $2, email = $3, 
                                           profile_pic = $4, location = $5, preferred_lang = $6 WHERE user_id = $7 RETURNING *`,
      [
        nFirstName,
        nlastName,
        nEmail,
        nProfilePicture,
        nlocation,
        nPrefLang,
        userId,
      ]
    );
    return result.length > 0;
  },
};

module.exports = usersModel;
