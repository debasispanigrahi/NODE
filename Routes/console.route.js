const router = require('express').Router();
router.get("/", (req, res) => {
    res.send("console")
})

module.exports = router