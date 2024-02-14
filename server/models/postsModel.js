const { executeQuery } = require('../config/utils');

/*
    If we integrate 'TypeScript' this is what it would allow us to do for all of the models (each with their unique 'interface')

    interface Post {
        post_id: Integer,
        user_id: Integer,
        content: Text,
        visibility: character varying,
        created_at: timestamp without time zone,
        updated_at: timestamp without time zone,
        caption: Text
    }
*/

const postsModel = {
    getPosts: async () => {
        return await executeQuery('SELECT * FROM \"Posts\"'); 
        // Expected output: https://drive.google.com/file/d/1MbDb3SK7ZnGiWSeB9Gma2ZvZ2XMrwMIT/view?usp=drive_link
    },
    getPostByUserId: async (user_id) => {
        return await executeQuery(`SELECT * FROM \"Posts\" WHERE user_id = $1`, [user_id]); // instead of using ? like in MySQL we use $1, $2, $3 in PostgreSQL
        // Expected output: https://drive.google.com/file/d/1rFHlh6Z1MZzi7Tlx-rDU_5zKco-WItDz/view?usp=drive_link
    },
    getPostById: async (id) => {
        return await executeQuery('SELECT * FROM \"Posts\" WHERE post_id = $1', [id]); 
        // Expected output: https://drive.google.com/file/d/1qyBEF2dbcKtMBNQOzsVgYmhyFdwkrfug/view?usp=drive_link
    }
}


module.exports = postsModel;