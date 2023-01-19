//DEPENDENCIES
const router = require("express").Router();
const controllers = require("@/Controllers");
const { signupValidator,loginValidator,updateUserValidator ,updateUserAdminValidator,deleteUserAdminValidator,findUserAdminValidatore} = require("@/Middleware/validation.middleware");
const {verifyAdminToken,verifyUserToken}=require("@/Middleware/token.middleware")

//AUTH ROUTE
router.post("/signup", signupValidator,controllers.auth.signup)
router.post("/login",loginValidator,controllers.auth.login)
//USER ROUTE
router.get("/user/find",verifyUserToken,controllers.user.find)
router.post("/user/update",verifyUserToken,updateUserValidator,controllers.user.update)
router.post("/user/delete",verifyUserToken,controllers.user.delete)
//ADMIN-USER ROUTE
router.post("/user/findadmin",verifyAdminToken,findUserAdminValidatore,controllers.user.findAdmin)
router.post("/user/update/:id",verifyAdminToken,updateUserAdminValidator,controllers.user.updateAdmin)
router.post("/user/delete/:id",verifyAdminToken,deleteUserAdminValidator,controllers.user.deleteAdmin)

//EXPORT
export default router