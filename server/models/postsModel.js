const { executeQuery } = require('../config/utils');

/*
    If we integrate 'TypeScript' this is what it would allow us to do for all of the models (each with their unique 'interface')

    interface Post {
        post_id: Integer,
        user_id: Integer,
        content: Text,
        caption: Text,
        visibility: Character Varying,
        created_at: TimeStamp,
        updated_at: TimeStamp
    }
*/

const postsModel = {
    getPosts: async () => {
        return await executeQuery('SELECT * FROM \"posts\"');
        // Expected output: https://drive.google.com/file/d/1MbDb3SK7ZnGiWSeB9Gma2ZvZ2XMrwMIT/view?usp=drive_link
    },
    getPostsByUserId: async (user_id) => {
        return await executeQuery(`SELECT * FROM \"posts\" WHERE user_id = $1`, [user_id]); // instead of using ? like in MySQL we use $1, $2, $3 in PostgreSQL
        // Expected output: https://drive.google.com/file/d/1rFHlh6Z1MZzi7Tlx-rDU_5zKco-WItDz/view?usp=drive_link
    },
    getPostById: async (id) => {
        return await executeQuery('SELECT * FROM \"posts\" WHERE post_id = $1', [id]);
        // Expected output: https://drive.google.com/file/d/1qyBEF2dbcKtMBNQOzsVgYmhyFdwkrfug/view?usp=drive_link
    },
    createPost: async (userId, content, caption, visibility) => {
        const result = await executeQuery(`INSERT INTO \"posts\" (user_id, content, caption, visibility) VALUES ($1, $2, $3, $4) 
                                           RETURNING *`, 
                                           [userId, content, caption, visibility]);
        return result.length > 0;
    }
}


module.exports = postsModel;