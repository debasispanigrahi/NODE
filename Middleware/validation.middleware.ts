
//DEPENDENCIES
import { body, oneOf, query, param } from "express-validator";
import { onlyOne } from "./coustom.middleware";
import { planList, userStatusList, fieldListAdmin } from "../Helpers/constants.helper";
// @ts-nocheck

//VALIDATION FOR SIGNUP
const signupValidator = [body("full_name").notEmpty().withMessage("Fullname is required").bail().isLength({ max: 40, min: 5 }).withMessage("Fullname must be below 40 characters and above 5 charcters"),
body("email").notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Please provide valid email"),
body("number").notEmpty().withMessage("number is required").bail().isNumeric().withMessage("Please provide valid phone number").bail().isLength({ max: 10, min: 10 }).withMessage("Number must be 10 digit"),
body("password").notEmpty().withMessage("Password is required").bail().isLength({ min: 8 }).withMessage("Password must be 8 character")]

//VALIDATION FOR LOGIN
const loginValidator = [oneOf([body("email").custom((a,{req})=>onlyOne(a,req.body,"number")).bail().notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Please provide valid email")
,body("number").custom((a,{req})=>onlyOne(a,req.body,"email")).bail().notEmpty().withMessage("number is required").bail().isNumeric().withMessage("Please provide valid phone number").bail().isLength({ max: 10, min: 10 }).withMessage("Number must be 10 digit")]
,"Please provide any one required value"),
body("password").notEmpty().withMessage("Password is required").bail().isLength({ min: 8 }).withMessage("Password must be 8 character")]

//VALIDATION FOR UPDATE
const updateUserValidator = [body("full_name").optional().isLength({ max: 40, min: 5 }).withMessage("Fullname must be below 40 characters and above 5 charcters"),
body("email").optional().isEmail().withMessage("Please provide valid email"),
body("number").optional().isNumeric().withMessage("Please provide valid phone number").bail().isLength({ max: 10, min: 10 }).withMessage("Number must be 10 digit"),
body("password").optional().isLength({ min: 8 }).withMessage("Password must be 8 character")]

//VALIDATION FOR UPDATE ADMIN
const updateUserAdminValidator = [body("full_name").optional().isLength({ max: 40, min: 5 }).withMessage("Fullname must be below 40 characters and above 5 charcters"),
body("email").optional().isEmail().withMessage("Please provide valid email"),
body("number").optional().isNumeric().withMessage("Please provide valid phone number").bail().isLength({ max: 10, min: 10 }).withMessage("Number must be 10 digit"),
body("password").optional().isLength({ min: 8 }).withMessage("Password must be 8 character"),
body("status").optional().custom(i=>userStatusList.includes(i)).withMessage("Valid Status Value Must Be Provided"),
body("plan").optional().custom(i=>planList.includes(i)).withMessage("Valid Value Must Be Provided"),
body("activeTill").optional().toDate().isDate().withMessage("Please Provide Valid Date").isAfter().withMessage("Date Must Be future One")]

//VALIDATION FOR DELETE BY ADMIN
const deleteUserAdminValidator=[param("id").isMongoId().withMessage("Pass Valid Mongo id"),query("force").optional().isBoolean().withMessage("Value Must Be Boolean")]

//VALIDATION FOR FIND BY ADMIN
const findUserAdminValidatore=[query("name").optional({nullable:false}).custom(i=>fieldListAdmin.includes(i)).withMessage("Valid Field Must Be Provided"),
query("value").custom((a,{req})=>!!req.body.name).bail().isString().withMessage("valid string Must Be Provided"),
query("field").optional({nullable:false}).custom(i=>fieldListAdmin.includes(i)).withMessage("Valid Field Must Be Provided"),
query("order").custom((a,{req})=>!!req.body.field).withMessage("Field Must Be Provided").bail().isIn([1,-1]).withMessage("Value must be 1 or -1"),
query("limit").optional().isInt({gt:0,allow_leading_zeroes:false,max:100}).withMessage("Limit field can have min & max value of 1 & 100")
]
// EXPORT
module.exports = { signupValidator, loginValidator,updateUserValidator,updateUserAdminValidator,deleteUserAdminValidator,findUserAdminValidatore }