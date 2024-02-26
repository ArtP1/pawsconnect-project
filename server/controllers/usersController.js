const { catchAsync } = require('../config/utils');
const usersModel = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const { SALT_ROUNDS, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN, 
        REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN } = require('../config/configs').security;
const { sendResponse } = require('../config/responseHandler');
const jwt = require("jsonwebtoken");


const usersController = {
    getUsers: catchAsync(async (req, res) => {
        const users = await usersModel.getUsers();
        sendResponse(res, 200, users, "Users retrieved successfully");
    }),
    getUserById: catchAsync(async (req, res) => {
        const { id } = req.user;

        const user = await usersModel.getUserById(id);

        const {password, ...userWithoutPassword} = user;

        if(!user) {
            return sendResponse(res, 404, {}, "User not found");
        }

        sendResponse(res, 200, userWithoutPassword, "User retrieved successfully");
    }),
    getUserFriendsById: catchAsync(async (req, res) => {
        const { id } = req.params;
        const userFriends = await usersModel.getUserFriendsById(id);
        sendResponse(res, 200, userFriends, "User friends retrieved succesfully");
    }),
    signup: catchAsync(async (req, res) => {
        const { firstName, lastName, username, email, password } = req.body;
        parseInt(SALT_ROUNDS);

        const salt = await bcrypt.genSalt(parseInt(SALT_ROUNDS));

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await usersModel.createUser(firstName, lastName, username, email, hashedPassword);

        const accessToken = jwt.sign({ id: newUser[0].user_id }, ACCESS_TOKEN_SECRET, { expiresIn: EXPIRES_IN });
        const refreshToken = jwt.sign({ id: newUser[0].user_id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });


        sendResponse(res, 201, { id: id, accessToken: accessToken, refreshToken: refreshToken }, "User created successfully. Welcome!");
    }),
    login: catchAsync(async (req, res) => {
        const { email, password } = req.body;
    
        const user = await usersModel.getUserByEmail(email);

        if (user.length === 0) {
            return sendResponse(res, 401, null, "Account not Found");
        }
    
        const isMatch = await bcrypt.compare(password, user[0].password);

        if (!isMatch) {
            return sendResponse(res, 401, null, "Email or Password are incorrect");
        }

        const accessToken = jwt.sign({ id: user[0].user_id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
        const refreshToken = jwt.sign({ id: user[0].user_id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

        sendResponse(res, 200, { id: user[0].user_id, accessToken: accessToken, refreshToken: refreshToken }, "Login successful");
    }),
    updateProfile: catchAsync(async (req, res) => {
        const { id } = req.user;
        const { nFirstName, nLastName, nUsername, nEmail, nProfilePicture, nLocation, nPrefLang } = req.body;

        const updatedUser = await usersModel.updateUser(nFirstName, nLastName, nUsername, nEmail, nProfilePicture, nLocation, nPrefLang, id);

        sendResponse(res, 200, null, "Profile updated successfully");
    }),
    refreshToken: catchAsync(async (req, res) => {
        const { id } = req.user;

        const refreshToken = jwt.sign({ id: id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

        sendResponse(res, 200, { refreshToken: refreshToken }, "Profile updated successfully");
    })
}


module.exports = usersController;