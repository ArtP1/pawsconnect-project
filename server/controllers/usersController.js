const { catchAsync } = require('../config/utils');
const usersModel = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const client = require('../config/database'); // Ensure the path matches your project structure
const session = require("express-session");


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
    }),

    login: catchAsync(async (req, res) => {
        const { email, password } = req.body;
    
        // Check if the user exists
        const userRows = await usersModel.getUserByEmail(email);
        if (userRows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const user = userRows[0];
        // console.log(user);
    
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Successful login, set up session
        req.session.authenticated = true;
        req.session.user = { id: user.user_id, email: user.email }; // Store essential user info, avoid storing sensitive info
        console.log(req.session.user)
        // Respond to the client
        const { password: _, ...userWithoutPassword } = user; // Exclude password from the response
        res.json({
            message: 'Login successful',
            user: userWithoutPassword
        });
    })
    




}


module.exports = usersController;