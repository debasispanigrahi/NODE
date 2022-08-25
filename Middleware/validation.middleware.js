
//DEPENDENCIES
const { body,oneOf } = require('express-validator');
const {onlyOne}=require("./coustom.middleware")

//VALIDATION FOR SIGNUP
const signupValidator = [body('full_name').notEmpty().withMessage("Fullname is required").bail().isLength({ max: 40, min: 5 }).withMessage("Fullname must be below 40 characters and above 5 charcters"),
body('email').notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Please provide valid email"),
body('number').notEmpty().withMessage("number is required").bail().isNumeric().withMessage("Please provide valid phone number").bail().isLength({ max: 10, min: 10 }).withMessage("Number must be 10 digit"),
body('password').notEmpty().withMessage("Password is required").bail().isLength({ min: 8 }).withMessage("Password must be 8 character")]

//VALIDATION FOR LOGIN
const loginValidator = [oneOf([body('email').custom((a,{req})=>onlyOne(a,req.body,"number")).bail().notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Please provide valid email")
,body('number').custom((a,{req})=>onlyOne(a,req.body,"email")).bail().notEmpty().withMessage("number is required").bail().isNumeric().withMessage("Please provide valid phone number").bail().isLength({ max: 10, min: 10 }).withMessage("Number must be 10 digit")]
,"Please provide any one required value"),
body('password').notEmpty().withMessage("Password is required").bail().isLength({ min: 8 }).withMessage("Password must be 8 character")]

// EXPORT
module.exports = { signupValidator, loginValidator }