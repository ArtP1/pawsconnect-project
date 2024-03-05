// File usage -> Valides incoming data before processing it in your controllers
const { body, validationResult } = require('express-validator');
const usersModel = require('../../models/usersModel');
const { sendResponse } = require('../../config/responseHandler');


const validateUserSignup = [
    body('firstName')
        .isAlpha().withMessage("First name must contain only alphabetical characters")
        .isLength({ min: 2 }).withMessage("First name must be at least 2 characters long")
        .trim(),
    body('lastName')
        .isAlpha().withMessage('Last name must contain only alphabetical characters')
        .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long')
        .trim(),
    body('username')
        .isAlphanumeric().withMessage('Username must be alphanumeric')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .trim()
        .custom(username => usersModel.getUserByUsername(username).then(user => {
            if (user.length > 0) {
                return Promise.reject("Username already in use");
            }
        })),
    body('email')
        .isEmail().withMessage("Email must be valid")
        .trim()
        .custom(email => usersModel.getUserByEmail(email).then(user => {
            
            if (user.length > 0) {
                return Promise.reject("Email already in use");
            }
        })),
    body('password')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,}).withMessage('Password needs 8+ chars with a mix of lower, upper, numbers, & symbols.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array(), null);
        }
        next();
    },
];


const validateUserProfileUpdate = [
    body('nFirstName')
        .optional()
        .isAlpha().withMessage("First name must contain only alphabetical characters")
        .isLength({ min: 2 }).withMessage("First name must be at least 2 characters long")
        .trim(),
    body('nLastName')
        .optional()
        .isAlpha().withMessage('Last name must contain only alphabetical characters')
        .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long')
        .trim(),
    body('nEmail')
        .optional()
        .isEmail().withMessage("Email must be valid")
        .trim()
        .custom(email => usersModel.verifyEmail(email).then(user => {
            
            if (user.length > 0) {
                return Promise.reject("Email already in use");
            }
        })),
    body('nProfilePicture')
        .optional()
        .isURL().withMessage("Profile picture must be a valid URL"),
    body('nLocation')
        .optional()
        .isLength({ min: 2 }).withMessage("Location must be at least 2 characters long")
        .trim(),
    body('nPrefLang')
        .optional()
        .isAlpha().withMessage("Preferred language must contain only alphabetical characters")
        .trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array(), null);
        }
        next();
    },
];


module.exports = {
    validateUserSignup,
    validateUserProfileUpdate
};