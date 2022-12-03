const router = require('express').Router();
router.get("/", (req, res) => {
    res.send("console")
})

export default router