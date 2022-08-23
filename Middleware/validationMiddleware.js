
//DEPENDENCIES
const { body } = require('express-validator');

//VALIDATION FOR SIGNUP
const signupValidator = [body('fullname').notEmpty().withMessage("Fullname is required").bail().isLength({ max: 40, min: 5 }).withMessage("Fullname must be below 40 characters and above 5 charcters"),
body('email').notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Please provide valid email"),
body('number').notEmpty().withMessage("number is required").bail().isNumeric().withMessage("Please provide valid phone number").bail().isLength({ max: 10, min: 10 }).withMessage("Number must be 10 digit"),
body('password').notEmpty().withMessage("Password is required").bail().isLength({ min: 8 }).withMessage("Password must be 8 character")]

//VALIDATION FOR LOGIN
const loginValidator = [body('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Please provide valid email"), body('password').isLength({ min: 8 }).withMessage("Password must be 8 character")]

// EXPORT
module.exports = { signupValidator, loginValidator }