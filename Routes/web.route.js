//DEPENDENCIES
const router = require('express').Router();
const controllers = require('@/Controllers');
const { signupValidator,loginValidator } = require('@/Middleware/validation.middleware');

//AUTH ROUTE
router.post("/signup", signupValidator,controllers.auth.signup)
router.post("/login",loginValidator,controllers.auth.login)

//EXPORT
module.exports = router