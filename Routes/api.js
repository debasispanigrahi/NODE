const router = require('express').Router();
router.get("/", (req, res) => {
    res.send("Dynamic Api")
})

module.exports = router