const db = require('../config/database');

const usersModel = {
    getUsers: async () => {
        try {
            // Table referencing must be like so: \"<table_name>\" 
            const { rows } = await db.query('SELECT * FROM \"Users\"'); 
            return rows;
        } catch (err) {
            throw err;
        }
    }
}


module.exports = usersModel;