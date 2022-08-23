//DEPENDENCIES
const { Schema, model } = require('mongoose')

//SCHEMA
const schema = Schema({
    fullName: { required: true, type: String },
    email: { required: true, type: String, unique: true },
    number: { required: true, type: Number, unique: true },
    password: { required: true, type: String },
    isAdmin: { type: Boolean, default: false },
    plan: { type: String, default: "basic" },
    status: { type: String, default: "pending" },
    otp: { type: String, default: 12345678 },
    activeTill: { type: Date, default: new Date().setDate(new Date().getDate() + 10) },
    appKey: { type: String, default: null },
    appSecret: { type: String, default: null }
}, { timestamps: true })

let user=model("user_cred", schema)
user.ensureIndexes()

//EXPORT
module.exports = user