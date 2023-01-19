
// @ts-nocheck

//DEPENDENCIES
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator");

//FUNCTION FOR VERIFY TOKEN
const verifyUserToken = (req, res, next) => {
    try {
        const target = req.headers
        if (!target.token || !(target.token).match(/^Bearer .{100,400}$/)) {
            res.status(422).json({
                status: false,
                code: 422,
                message: "Please provide token in header",
                body: `Provided value is ${target.token}`
            })
            return
        }
        const token = req.headers.token.split(" ")[1]
        const verifyToken = jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                res.status(403).json({
                    status: false,
                    code: 403,
                    message: "Invalid token sent in header",
                    body: `Provided value is ${target.token}`

                })
                return
            }
            req.id = user.id
            req.is_admin = user.is_admin
            next()
        })
        return
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

//FUNCTION FOR VERIFY TOKEN AND ADMIN
const verifyAdminToken = (req, res, next) => {
    try {
        const target = req.headers
        if (!target.token || !(target.token).match(/^Bearer .{100,400}$/)) {
            res.status(401).json({
                status: false,
                code: 401,
                message: "Please provide token in header",
                body: `Provided value is ${target.token}`
            })
            return
        }
        const token = req.headers.token.split(" ")[1]
        const verifyToken = jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                res.status(403).json({
                    status: false,
                    code: 403,
                    message: "Invalid token sent in header",
                    body: `Provided value is ${target.token}`

                })
                return
            }
            if (!user.is_admin) {
                res.status(403).json({
                    status: false,
                    code: 403,
                    message: "You do not have admin right !!!",
                    body: `Provided value is ${target.token}`
                })
                return
            }
            req.id = user.id
            req.is_admin = user.is_admin
            next()
        })
        return
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

module.exports = { verifyUserToken, verifyAdminToken }