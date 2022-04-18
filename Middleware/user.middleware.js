const check = (req, res, next) => {
    if (req.query.name) {
        next()
    }
    else {
        res.send("Not allowed");
    }
}
module.exports = { check }