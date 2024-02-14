const { catchAsync } = require('../config/utils'); 
const usersModel = require('../models/usersModel');


const usersController = {
    getUsers: catchAsync(async (req, res) => {
        const users = await usersModel.getUsers();
        res.json(users);
    }),
    getUserById: catchAsync(async (req, res) => {
        const { id } = req.params;
        const user = await usersModel.getUserById(id);
        res.json(user);
    }),
    getUserFriendsById: catchAsync(async (req, res) => {
        const { id } = req.params;
        const userFriends = await usersModel.getUserFriendsById(id);
        res.json(userFriends)
    })
}


module.exports = usersController;