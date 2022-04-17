exports.start = (req, res) => {
    console.log("debasish")
    res.status(200).json({
        status: true,
        message: "cartcounter"
    })
}