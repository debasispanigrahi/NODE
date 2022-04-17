//DEPENDENCIES
const { Schema, model } = require('mongoose')

//SCHEMA
const schema = Schema({
    fullname: { required: true, type: String },
    email: { required: true, type: String, unique: true },
    number: { required: true, type: Number, unique: true },
    password: { required: true, type: String },
    isAdmin: { type: Boolean, default: false },
    limit: { type: Number, default: 5 },
    plan: { type: String, default: "basic" },
    status: { type: String, default: "pending" },
    otp: { type: String, default: 12345678 },
    api_url: { type: String, default: null },
    activeTill: { type: Date, default: new Date().setDate(new Date().getDate() + 10) },
    app_key: { type: String, default: null },
    app_secret: { type: String, default: null }
}, { timestamps: true })

//EXPORT
module.exports = model("user", schema)