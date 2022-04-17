const router = require('express').Router();
const controller = require('../Controllers')
router.get("/counter", controller.counter.start)

module.exports = router