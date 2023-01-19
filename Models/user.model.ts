//DEPENDENCIES
const { Schema, model } = require("mongoose")
const {userStatusList, planList}=require("../Helpers/constants.helper")

//SCHEMA
const schema = Schema({
    full_name: { required: true, type: String },
    email: { required: true, type: String, unique: true },
    number: { required: true, type: String, unique: true },
    password: { required: true, type: String },
    is_admin: { type: Boolean, default: false },
    plan: { type: String,enum:planList, default: "basic" },
    status: { type: String,enum:userStatusList, default: "pending" },
    otp: { type: String, default: 12345678 },
    active_till: { type: Date, default: new Date().setDate(new Date().getDate() + 10) },
    app_key: { type: String, default: null },
    app_secret: { type: String, default: null }
}, { timestamps: true })

let user=model("usercred", schema)
user.ensureIndexes()

//EXPORT
module.exports = user