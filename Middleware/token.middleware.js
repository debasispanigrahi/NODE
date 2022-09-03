//DEPENDENCIES
const jwt = require('jsonwebtoken')
const { validationResult } = require("express-validator");
// const userModel = require("../Model/userModel")

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

// //FUNCTION FOR ID BASED MESSAGE
// const verifySendMessageUser = async (req, res, next) => {
//     const result = validationResult(req);
//     if (!result.isEmpty()) {
//         res.status(406).json({
//             Status: false,
//             StatusCode: 406,
//             Message: result,
//         });
//         return;
//     }
//     try {
//         var user = await userModel.findById(req.query.user);
//         if (user.status == 'online') {
//             if (user.plan != 'basic') {
//                 next()
//             }
//             else {
//                 if (user.limit <= 0) {
//                     res.status(200).json({
//                         status: false,
//                         messagecode: 400,
//                         message: "Message Limit Reached !!! Please Recharge Pack"
//                     })
//                     return
//                 }
//                 else {
//                     req.resource = user
//                     next()
//                 }
//             }
//         }
//         else {
//             res.status(400).json({
//                 status: true,
//                 messagecode: 400,
//                 message: `User status is ${user.status}. Message Sending Not Allowed. Please Contact Admin.`
//             })
//             return
//         }
//     } catch (error) {
//         res.status(200).json({
//             status: false,
//             messagecode: 400,
//             message: "No User Found",
//         });
//         return;
//     }
// }

// //FUNCTION FOR ID BASED MEDIA
// const verifySendMediaUser = async (req, res, next) => {
//     const result = validationResult(req);
//     if (!result.isEmpty()) {
//         res.status(406).json({
//             Status: false,
//             StatusCode: 406,
//             Message: result,
//         });
//         return;
//     }
//     try {
//         var user = await userModel.findById(req.body.user);
//         if (user.status == 'online') {
//             if (user.plan != 'basic') {
//                 next()
//             }
//             else {

//                 res.status(200).json({
//                     status: false,
//                     messagecode: 400,
//                     message: "Media Service Available To Only Full Time User"
//                 })
//                 return

//             }
//         }
//         else {
//             res.status(400).json({
//                 status: true,
//                 messagecode: 400,
//                 message: `User status is ${user.status}. Message Sending Not Allowed. Please Contact Admin.`
//             })
//             return
//         }
//     } catch (error) {
//         res.status(200).json({
//             status: false,
//             messagecode: 400,
//             message: "No User Found",
//         });
//         return;
//     }
// }

// //FUNCTION FOR APPKEY BASED
// const verifyAppSendMessageUser = async (req, res, next) => {
//     const result = validationResult(req);
//     if (!result.isEmpty()) {
//         res.status(200).json({
//             status: false,
//             messagecode: 406,
//             message: result,
//         });
//         return;
//     }
//     const app_key = req.query.key || req.body.key
//     const app_secret = req.query.secret || req.body.secret
//     try {
//         const user = await userModel.findOne({ app_key: app_key, app_secret: app_secret })
//         if (!user) {
//             res.status(400).json({
//                 status: false,
//                 message: "False API Credentials Found"
//             })
//             return
//         }
//         req.id = user._id.toString()
//         if (user.status == 'online') {
//             if (user.plan != 'basic') {
//                 next()
//             }
//             else {
//                 if (user.limit <= 0) {
//                     res.status(200).json({
//                         status: false,
//                         messagecode: 400,
//                         message: "Message Limit Reached !!! Please Recharge Pack"
//                     })
//                     return
//                 }
//                 else {
//                     req.resource = user
//                     next()
//                 }
//             }
//         }
//         else {
//             res.status(400).json({
//                 status: true,
//                 messagecode: 400,
//                 message: `User status is ${user.status}. Message Sending Not Allowed. Please Contact Admin.`
//             })
//             return
//         }
//     } catch (error) {
//         res.status(500).json({
//             status: false,
//             message: "Internal Server Error Occured"
//         })
//         return
//     }
// }

module.exports = { verifyUserToken, verifyAdminToken }