const usersModel = require('../models/usersModel');

const usersController = {
    getUsers: async (req, res) => {
        try {
            const users = await usersModel.getUsers();
            res.json(users);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
}

module.exports = usersController;