const check = (req, res, next) => {
   try {
    throw new Error("THIS IS INSIDE USER")
    
   } catch (error) {
    Logger.info(error)
    res.send("ok")
   }
}
module.exports = { check }
