const { catchAsync } = require('../config/utils');
const usersModel = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const { SALT_ROUNDS, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN, 
        REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN } = require('../config/configs').security;
const { sendResponse } = require('../config/responseHandler');
const jwt = require("jsonwebtoken");


const usersController = {
    getAllUsers: catchAsync(async (req, res) => {
        const users = await usersModel.getUsers();
        sendResponse(res, 200, true, users, "Users retrieved successfully");
    }),
    getFriends: catchAsync(async (req, res) => {
        const { id } = req.user;
        const friends = await usersModel.getFriends(id);
        sendResponse(res, 200, true, friends, "Use Friends retrieved successfully");
    }),
    getUserById: catchAsync(async (req, res) => {
        const { id } = req.user;

        const user = await usersModel.getUserById(id);

        const {password, ...userWithoutPassword} = user;

        if(!user) {
            return sendResponse(res, 404, false, null, "User not found");
        }

        sendResponse(res, 200, true, userWithoutPassword, "User retrieved successfully");
    }),
    getUserMessages: catchAsync(async (req, res) => {
        const { id } = req.user;

        const messages = await usersModel.getUserMessages(id);

        if(messages.length == 0) {
            return sendResponse(res, 404, false, null, "User messages not found");
        }

        sendResponse(res, 200, true, messages, "User messages retrieved successfully");
    }),
    signup: catchAsync(async (req, res) => {
        // This method doesn't require error handling as the 'userValidation' middelware takes care of it
        const { firstName, lastName, username, email, password } = req.body;

        const salt = await bcrypt.genSalt(parseInt(SALT_ROUNDS));

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await usersModel.createUser(firstName, lastName, username, email, hashedPassword);

        const accessToken = jwt.sign({ id: newUser[0].user_id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
        const refreshToken = jwt.sign({ id: newUser[0].user_id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

        sendResponse(res, 201, true,  { id: newUser[0].user_id, accessToken: accessToken, refreshToken: refreshToken }, "User created successfully. Welcome!");
    }),
    login: catchAsync(async (req, res) => {
        const { email, password } = req.body;
    
        const user = await usersModel.getUserByEmail(email);
    
      
        if (!user || user.length === 0 || !(await bcrypt.compare(password, user[0].password))) {
            return sendResponse(res, 401, false, null, "Invalid login details. Please try again.");
        }
    
        const accessToken = jwt.sign({ id: user[0].user_id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
        const refreshToken = jwt.sign({ id: user[0].user_id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
    
        sendResponse(res, 200, true, { id: user[0].user_id, accessToken: accessToken, refreshToken: refreshToken }, "Login successful. Welcome back!");
    }),
    updateProfile: catchAsync(async (req, res) => {
        const { id } = req.user;
        const { nFirstName, nLastName, nEmail, nProfilePicture, nLocation, nPrefLang } = req.body;

        const updatedUser = await usersModel.updateUser(nFirstName, nLastName, nEmail, nProfilePicture, nLocation, nPrefLang, id);

        if(!updatedUser) {
            return sendResponse(res, 200, false, null, "Profile failed to update profile. If the problem persists, contact support for assistance.");
        }
        
        sendResponse(res, 200, true, null, "Profile updated successfully");
    }),
    refreshToken: catchAsync(async (req, res) => {
        const { id } = req.user;

        // No need to do error checks, the middleware takes care of this one
        const refreshToken = jwt.sign({ id: id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

        sendResponse(res, 200, true, { refreshToken: refreshToken }, "Refresh token issued successfully.");
    })
}


module.exports = usersController;