/// <reference path="../Controllers/counter.js"/>
const router = require('express').Router();
const controllers = require('@root/Controllers');
const data=require("@root/Controllers")
const { check } = require('@root/Middleware/user.middleware');
router.get("/", check, controllers.counter.start)
module.exports = router