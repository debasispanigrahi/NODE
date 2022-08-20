/// <reference path="../Controllers/counter.js"/>
const router = require('express').Router();
const controllers = require('@/Controllers');
const data=require("@/Controllers")
const { check } = require('@/Middleware/user.middleware');
router.get("/", check, controllers.counter.start)
module.exports = router