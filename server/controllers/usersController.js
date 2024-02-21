const { catchAsync } = require('../config/utils'); 
const usersModel = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const client = require('../config/database'); // Ensure the path matches your project structure


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
    }),

    signup: catchAsync(async (req, res) => {
        const { username, email, password } = req.body;
        console.log(username);

        // Check if the user already exists using the executeQuery utility function
        const userExists = await usersModel.getUserByEmail(email);

        if (userExists.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new user using the executeQuery utility function
        const newUserRows = await usersModel.addUser(username, email, hashedPassword)

        // Assuming executeQuery returns the rows directly, we can directly access the first row
        const newUser = newUserRows[0];

        // Exclude password from the response
        const { password: _, ...userWithoutPassword } = newUser;
        console.log(newUser);
        res.status(201).json({ user: userWithoutPassword });
    })
}


module.exports = usersController;