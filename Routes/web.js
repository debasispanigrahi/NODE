const router = require('express').Router();
const controller = require('../Controllers')
router.get("/", controller.counter.start)

module.exports = router