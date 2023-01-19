//DEPENDENCIES
const userModel = require("@/Models/user.model");
const cryptoJs = require("crypto-js");
const { makeUndefined, getFromObject } = require("../Helpers/utilty.helper");
const { validationResult } = require("express-validator")

//GET REQUEST FOR SPECIFIC USER
exports.find = async (req, res) => {
    try {
        const id = req.id
        var user = await userModel.findById(id).lean();
        if (!user) {
            res.status(404).json({
                status: false,
                code: 404,
                message: "User Details Not Found !!!",
                body: { id: req.id }
            })
            return
        }
        res.status(200).json({
            status: true,
            code: 200,
            message: "User Details Found",
            body: { ...makeUndefined(user, "otp", "password", user.is_admin || "is_admin", "__v") }
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

//GET REQUEST FOR SPECIFIC USER ADMIN
exports.findAdmin = async (req, res) => {
    var name = req.query.name || null
    var value = req.query.value || null
    var field = req.query.field || "fullname";
    var order = req.query.orderBy || 1;
    var limit = parseInt(req.query.limit) || 5;
    try {
        var user = await userModel
            .find({ [name]: value })
            .sort({ [field]: order })
            .limit(limit);
        res.status(200).json({
            status: true,
            message: user,
        });
        return;
    } catch (error) {
        res.status(403).json({
            status: false,
            message: "Error occured while fetching data",
        });
    }
}

//PUT REQUEST FOR SPECIFIC USER
exports.update = async (req, res) => {
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
        const id = req.id
        try {
            const exist = await userModel.findById(id)
            if (!exist) {
                res.status(404).json({
                    status: false,
                    code: 404,
                    message: "User Does Not exist !!! Please Change User Details",
                    body: getFromObject(req.body, ["email", "number", "full_name"])
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
        //UPDATE INTO DATABASE WITH SHA256 ENCRYPTION
        const target = req.body
        target.password = cryptoJs.SHA256(target.password).toString(cryptoJs.enc.Base64)
        const payload = getFromObject(target, ["full_name", "email", "number", "password"])
        try {
            const updateUser = await userModel.findByIdAndUpdate(
                id,
                {
                    $set: {
                        ...payload,
                        updatedAt: new Date()
                    },
                },
                { new: true }
            );
            res.status(200).json({
                status: true,
                code: 200,
                message: "User Updated Successfully",
                body: makeUndefined(updateUser, "otp", "password", "is_admin", "__v")
            })
            return
        } catch (error) {
            Error(error)
            res.status(500).json({
                status: false,
                code: 500,
                message: "Can Not Update Into Database Due To Error. Please Wait !!!",
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

//PUT REQUEST FOR SPECIFIC USER ADMIN
exports.updateAdmin = async (req, res) => {
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
        const id = req.id
        try {
            const exist = await userModel.findById(id)
            if (!exist) {
                res.status(409).json({
                    status: false,
                    code: 409,
                    message: "User Does Not exist !!! Please Change User Details",
                    body: getFromObject(req.body, ["email", "number", "full_name"])
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
        //UPDATE INTO DATABASE WITH SHA256 ENCRYPTION
        const target = req.body
        target.password = cryptoJs.SHA256(target.password).toString(cryptoJs.enc.Base64)
        const payload = getFromObject(target, ["full_name", "email", "number", "password", "plan", "status", "activeTill"])
        try {
            const updateUser = await userModel.findByIdAndUpdate(
                id,
                {
                    $set: {
                        ...payload,
                        updatedAt: new Date()
                    },
                },
                { new: true }
            );
            res.status(200).json({
                status: true,
                code: 200,
                message: "User Updated Successfully",
                body: makeUndefined(updateUser, "otp", "password", "is_admin", "__v")
            })
            return
        } catch (error) {
            Error(error)
            res.status(500).json({
                status: false,
                code: 500,
                message: "Can Not Update Into Database Due To Error. Please Wait !!!",
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

//DELETE REQUEST FOR SPECIFIC USER
exports.delete = async (req, res) => {
    try {
        //CHECK FOR EXISTANCE
        const id = req.id
        try {
            const user = await userModel.findById(id).lean();
            if (!user) {
                res.status(404).json({
                    status: false,
                    code: 404,
                    message: "User Details Do Not Exist Or It May Be Deleted !!!",
                    body: { id }
                })
                return
            }
            else if (user.status === "hidden") {
                res.status(406).json({
                    status: false,
                    code: 406,
                    message: "User Status Is Already Supressed. Contact Admin For Permanent Delete !!!",
                    body: { id }
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
        try {
            const user = await userModel.findOneAndUpdate(
                { id },
                {
                    status: "hidden",
                    updatedAt: new Date()
                },
                { runValidators: true, new: true }
            ).lean();
            res.status(200).json({
                status: true,
                code: 200,
                message: "User Status Is Supressed  !!! Permanent Removal Need Admin Approval.",
                body: { ...makeUndefined(user, "otp", "password", user.is_admin || "is_admin", "__v") }
            })
            return
        } catch (error) {
            Error(error)
            res.status(500).json({
                status: false,
                code: 500,
                message: "Can Not Soft Delete User Details Due To Database Error. Please Wait !!!",
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
};

//DELETE REQUEST FOR SPECIFIC USER ADMIN
exports.deleteAdmin = async (req, res) => {
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
        let user
        const id = req.params.id
        try {
            user = await userModel.findById(id).lean();
            if (!user) {
                res.status(404).json({
                    status: false,
                    code: 404,
                    message: "User Details Do Not Exist Or It May Be Deleted !!!",
                    body: { id }
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
        if (req.query.force) {
            try {
                const hardDeleteUser = await userModel.findByIdAndDelete(id, { new: true });
                res.status(200).json({
                    status: true,
                    code: 200,
                    message: "User Details Deleted Permanently",
                    body: { ...makeUndefined(hardDeleteUser, "otp", "password", user.is_admin || "is_admin", "__v") }
                })
                return
            } catch (error) {
                Error(error)
                res.status(500).json({
                    status: false,
                    code: 500,
                    message: "Can Not Delete User Details Due To Database Error. Please Wait !!!",
                    body: error.message
                })
                return
            }
        }
        else {
            if (user.status === "hidden") {
                res.status(406).json({
                    status: false,
                    code: 406,
                    message: "User Status Is Already Supressed. Pass Additional Query for permanent Removal !!!",
                    body: { id }
                })
                return
            }
            try {
                const softDeleteUser = await userModel.findOneAndUpdate(
                    { id },
                    {
                        status: "hidden",
                        updatedAt: new Date()
                    },
                    { runValidators: true, new: true }
                ).lean();
                res.status(200).json({
                    status: true,
                    code: 200,
                    message: "User Status Is Supressed  !!! Permanent Removal Require Additional Param.",
                    body: { ...makeUndefined(softDeleteUser, "otp", "password", user.is_admin || "is_admin", "__v") }
                })
                return
            } catch (error) {
                Error(error)
                res.status(500).json({
                    status: false,
                    code: 500,
                    message: "Can Not Soft Delete User Details Due To Database Error. Please Wait !!!",
                    body: error.message
                })
                return
            }
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
};
