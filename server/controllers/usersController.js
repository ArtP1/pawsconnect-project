const { catchAsync } = require('../config/utils');
const usersModel = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const { SALT_ROUNDS, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN, 
        REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN } = require('../config/configs').security;
const { sendResponse } = require('../config/responseHandler');
const jwt = require("jsonwebtoken");


const usersController = {
    getUserId: catchAsync(async (req, res) => {
        const { id } = req.user;
        sendResponse(res, 200, true, id, null);
    }),
    getAllUsers: catchAsync(async (req, res) => {
        const { usage } = req.query;
        const { id } = req.user;

        let users;

        switch(usage) {
            case 'search':
                users = await usersModel.getUsersForMemberSearch(id);
                break;
            default:
                break;
        }

        if(!users || users.length == 0) {
            return sendResponse(res, 404, false, null, "No users found");
        }

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
    getUserConvos: catchAsync(async (req, res) => {
        const { id } = req.user;

        const convos = await usersModel.getUserConvos(id);

        if(convos.length === 0) {
            return sendResponse(res, 404, false, null, "User messages not found");
        }

        sendResponse(res, 200, true, convos, "User messages retrieved successfully");
    }),
    getConvoMessages: catchAsync(async (req, res) => {
        const { otherUserId } = req.params;
        const { id } = req.user;

        const convoMessages = await usersModel.getUserConvoMsgs(id, otherUserId);

        sendResponse(res, 200, true, convoMessages, "User conversation messages retrieved successfully");
    }),
    getNotifications: catchAsync(async (req, res) => {
        const { id } = req.user;

        const notifications = await usersModel.getUserNotifications(id);

        if(notifications.length === 0) {
            return sendResponse(res, 404, false, null, "No notifications found");
        }

        sendResponse(res, 200, true, notifications, "User notifications retrieved successfully");
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
    createConvo: catchAsync(async (req, res) => {
        const { id } = req.user;
        const { nReceiverId, nMsgText } = req.body;
        const currentTimestamp = new Date();

        const convo = await usersModel.createConvo(id, nReceiverId);

        /*
            This still needs work, specifically for when the conversation already exists, then the
            action would be to identify that here and then return a response that we can use to 
            differentiate between a new conversation and an existing one
        */
        const message = await usersModel.createMsg(convo[0].convo_id, id, nReceiverId, nMsgText);
        const linkMsg = await usersModel.linkNewMsgToConvo(message[0].msg_id, currentTimestamp, convo[0].convo_id);
    
        sendResponse(res, 200, true, null, "Conversation was created successfully");
    }),
    createMsg: catchAsync(async (req, res) => {
        const nSenderId = req.user.id;
        const { convoId, nReceiverId, nMsgText } = req.body;
        const currentTimestamp = new Date();

        const message = await usersModel.createMsg(convoId, nSenderId, nReceiverId, nMsgText);
        const linkMsg = await usersModel.linkNewMsgToConvo(message[0].msg_id, currentTimestamp, convoId);

        sendResponse(res, 200, true, null, "Message was created successfully");
    }),
    updateMsgsReadState: catchAsync(async (req, res) => {
        const currentUserId = req.user.id;
        const { convoId } = req.body;

        const updatedMsgs = await usersModel.updateMsgsReadState(convoId, currentUserId);

        if(!updatedMsgs) {
            return sendResponse(res, 200, false, "No unread messages found");
        }

        sendResponse(res, 200, true, null, "Message(s) have been marked as read");
    }),
    acceptFriendRequest: catchAsync(async (req, res) => {
        const { id } = req.user;
        const { requesterId, notiId } = req.body;

        const friendRequest = await usersModel.acceptFriendRequest(id, requesterId);
        const remoteFriendReqNotification = await usersModel.deleteFriendRequestNotification(notiId);

        if(!friendRequest && !remoteFriendReqNotification) {
            return sendResponse(res, 200, false, null, "Friend request could not be accepted. Please try again later.");
        }

        sendResponse(res, 200, true, null, "Friend request accepted successfully");
    }),
    createPetTransferReq: catchAsync(async (req, res) => {
        const currPetOwnerId = req.user.id;
        const { nextOwnerId, petId } = req.body;

        const transferRequest = await usersModel.createPetTransferReq(petId, currPetOwnerId, nextOwnerId);
        const createPetTransReqNoti = await usersModel.createPetTransReqNoti(nextOwnerId, currPetOwnerId, petId);

        console.log(createPetTransReqNoti);

        if(!transferRequest && !createPetTransReqNoti) {
            return sendResponse(res, 200, false, null, "Pet transfer request could not be created. Please try again later.");
        }

        sendResponse(res, 200, true, null, "Pet transfer request created successfully");
    }),
    refreshToken: catchAsync(async (req, res) => {
        const { id } = req.user;

        // No need to do error checks, the middleware takes care of this one
        const refreshToken = jwt.sign({ id: id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

        sendResponse(res, 200, true, { refreshToken: refreshToken }, "Refresh token issued successfully.");
    })
}


module.exports = usersController;