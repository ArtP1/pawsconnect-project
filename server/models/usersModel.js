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
    return await executeQuery(`SELECT * FROM \"users\"`);
  },
  getUsersForMemberSearch: async (id) => {
    return await executeQuery(`
      SELECT user_id, first_name, last_name, username, profile_pic
      FROM \"users\"
      WHERE user_id <> $1`,
      [id]
    );
  },
  getFriends: async (id) => {
    return await executeQuery(`
      SELECT u.user_id, u.first_name, u.last_name, u.username, u.profile_pic, u.location 
      FROM \"users\" u
      JOIN \"userrelationships\" ur ON u.user_id = ur.friend_id 
      WHERE ur.user_id = $1`,
      [id]
    );
  },
  getUserById: async (id) => {
    return await executeQuery(`
      SELECT * FROM \"users\" 
      WHERE user_id = $1`,
      [id]
    );
  },
  getUserByUsername: async (username) => {
    return await executeQuery(`SELECT * FROM \"users\" WHERE username = $1`, [
      username,
    ]);
  },
  getUserFriendsById: async (id) => {
    return await executeQuery(`
      SELECT * FROM \"userrelationships\" 
      WHERE user_id = $1`,
      [id]
    );
  },
  getUserByEmail: async (email) => {
    return await executeQuery(`SELECT * FROM \"users\" WHERE email = $1`, 
    [email]);
  },
  getUserConvos: async (id) => {
    return await executeQuery(`
      SELECT
        c.convo_id,
        u.user_id AS receiver_id,
        u.username AS receiver_username,
        u.profile_pic AS receiver_profile_pic,
        m.message_txt,
        CASE
            WHEN m.sender_id = $1 THEN 'sent'
            ELSE 'received'
        END AS message_direction,
        CASE
          WHEN m.sender_id != $1 THEN m.is_read
        END AS is_read,
        m.timestamp
      FROM Conversations c
      JOIN Messages m ON c.latest_msg_id = m.msg_id
      JOIN Users u ON u.user_id = CASE
                                      WHEN c.participant_one = $1 THEN c.participant_two
                                      ELSE c.participant_one
                                  END
      WHERE c.participant_one = $1 OR c.participant_two = $1
      ORDER BY m.timestamp DESC`,
      [id]
    );
  },
  getUserConvoMsgs: async (userId, otherUserId) => {
    return await executeQuery(`
      SELECT
        m.msg_id,
        m.sender_id,
        m.receiver_id,
        m.message_txt,
        m.timestamp,
        m.is_read
      FROM \"messages\" m
      WHERE (m.sender_id = $1 AND m.receiver_id = $2) OR (m.sender_id = $2 AND m.receiver_id = $1)
      ORDER BY m.timestamp ASC`,
      [userId, otherUserId]
    );
  },
  getUserNotifications: async (id) => {
    return await executeQuery(`
      SELECT 
        n.noti_id, 
        n.title, 
        n.sub_heading, 
        n.type, 
        n.is_read, 
        n.created_at, 
        n.post_id, 
        n.ref_user_id,
        p.content,
        u.username AS ref_username 
      FROM \"notifications\" n
      LEFT JOIN
        \"posts\" p ON p.post_id = n.post_id
      LEFT JOIN 
        \"users\" u ON u.user_id = n.ref_user_id 
      WHERE n.receiver_id = $1
      ORDER BY 
        n.created_at DESC`,
      [id]
    );
  },
  createUser: async (firstName, lastName, username, email, hashedPassword) => {
    return await executeQuery(`
      INSERT INTO \"users\" (first_name, last_name, username, email, password) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [firstName, lastName, username, email, hashedPassword]
    );
  },
  createConvo: async (nSender, nReceiver) => {
    return await executeQuery(`
      INSERT INTO \"conversations\" (participant_one , participant_two) 
      VALUES ($1, $2) RETURNING *`,
      [nSender, nReceiver]
    );
  },
  createMsg: async (convoId, nSender, nReceiver, nMsgTxt) => {
    return await executeQuery(`
      INSERT INTO \"messages\" (convo_id, sender_id, receiver_id, message_txt)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [convoId, nSender, nReceiver, nMsgTxt]
    );
  },
  linkNewMsgToConvo: async (msgId, timestamp, convoId) => {
    const result = await executeQuery(`
      UPDATE conversations
      SET latest_msg_id = $1, latest_msg_timestamp = $2 
      WHERE convo_id = $3`,
      [msgId, timestamp, convoId]
    );

    return result.length > 0;
  },
  updateMsgsReadState: async (convoId, currentUserId) => {
    const result = await executeQuery(`
      UPDATE \"messages\"
      SET is_read = true
      WHERE convo_id = $1 AND receiver_id = $2 AND is_read = false`,
      [convoId, currentUserId]
    );

    return result.length > 0;
  },
  acceptFriendRequest: async (userId, requesterId) => {
    const result = await executeQuery(`
      INSERT INTO \"userrelationships\" (user_id, friend_id)
      VALUES ($1, $2) 
      RETURNING *`,
      [userId, requesterId]
    );

    return result.length > 0;
  },
  deleteFriendRequestNotification: async (notiId) => {
    const result = await executeQuery(`
      DELETE FROM \"notifications\"
      WHERE noti_id = $1 
      RETURNING *`,
      [notiId]
    );

    return result.length > 0;
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
      `
      UPDATE \"users\" SET first_name = $1, last_name = $2, email = $3, profile_pic = $4, 
        location = $5, preferred_lang = $6 
      WHERE user_id = $7 RETURNING *`,
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
