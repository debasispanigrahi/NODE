//DEPENDENCIES
const { validationResult } = require('express-validator')
const cryptoJs = require('crypto-js')
const userModel = require("../Models/user.model")
const jwt = require('jsonwebtoken')
const { makeUndefined, getFromObject, getObjectToArray } = require('../Helpers/utilty.helper')

//SIGNUP 
exports.signup = async (req, res) => {
    try {
        //CHECK FOR VALIDATION
        const result = validationResult(req)
        if (!result.isEmpty()) {
            res.status(422).json({
                status: false,
                code: 422,
                message: "Validation Error!!! Please Send Proper Request",
                body: result
            })
            return
        }
        //CHECK FOR EXISTANCE
        const existPayload = getObjectToArray(req.body, ["email", "number"])
        try {
            const exist = await userModel.find({ $or: existPayload })
            if (exist.length) {
                res.status(409).json({
                    status: false,
                    code: 409,
                    message: "User Already exist !!! Please Change User Details",
                    body: getFromObject(req.body, ["email", "number"])
                })
                return
            }

        } catch (error) {
            Error(error)
            res.status(500).json({
                status: false,
                code: 500,
                message: "Can Not Verify User Details Due To Database Error. Please Wait !!!",
                body: error.message
            })
            return
        }
        //INSERT INTO DATABASE WITH SHA256 ENCRYPTION
        req.body.password = cryptoJs.SHA256(req.body.password).toString(cryptoJs.enc.Base64)
        const payload = getFromObject(req.body, ["full_name", "email", "number", "password"])
        try {
            const saveUser = userModel(payload)
            let user = await saveUser.save()
            res.status(201).json({
                status: true,
                code: 201,
                message: "User Created Successfully",
                body: makeUndefined(user, "otp", "password", "is_admin", "__v")
            })
            return
        } catch (error) {
            Error(error)
            res.status(500).json({
                status: false,
                code: 500,
                message: "Can Not Insert Into Database Due To Error. Please Wait !!!",
                body: error.message
            })
            return
        }
    } catch (error) {
        Error(error)
        res.status(500).json({
            status: false,
            code: 500,
            message: "Internal Server Error",
            body: error.message
        })
        return
    }
}

//LOGIN
exports.login = async (req, res) => {
    try {
        const target=req.body
        //CHECK FOR VALIDATION
        const result = validationResult(req)
        if (!result.isEmpty()) {
            res.status(422).json({
                status: false,
                code: 406,
                message: "Validation Error!!! Please Send Proper Request",
                body: result
            })
            return
        }
        target.password = cryptoJs.SHA256(target.password).toString(cryptoJs.enc.Base64)
        //CHECK FOR EXISTANCE
        const existPayload = getObjectToArray(target, ["email", "number"])
        try {
            var user = await userModel.findOne({ $or: existPayload }).lean()
            if(!user){
                res.status(404).json({
                    status: false,
                    code: 404,
                    message: "User Name Does Not Exist !!!",
                    body:getFromObject(target, ["email", "number"])
                }) 
                return
            }
            if (target.password !== user.password) {
                res.status(404).json({
                    status: false,
                    code: 404,
                    message: "UserName and Password Does Not Match !!!",
                    body:getFromObject(target, ["email", "number"])
                })
                return
            }
            const token = jwt.sign({ id: user._id, is_admin: user.is_admin }, process.env.JWT_KEY, { expiresIn: process.env.JWT_VALIDITY })
            res.status(200).json({
                status: true,
                code: 200,
                message: "User Login Successful",
                body:{ ...makeUndefined(user, "otp", "password", user.is_admin || "is_admin", "__v"), token }
            })
        } catch (error) {
            Error(error)
            res.status(500).json({
                status: false,
                code: 500,
                message: "Can Not Verify User Details May Be Due To Database Error. Please Wait !!! !!!",
                body:error.message
            })
        }
    } catch (error) {
        Error(error)
        res.status(500).json({
            status: false,
            code: 500,
            message: "Internal Server Error",
            body: error.message
        })
        return
    }



}