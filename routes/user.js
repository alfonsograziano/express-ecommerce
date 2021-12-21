const router = require("express").Router()
const userController = require("../controllers/user.controller")
const { check } = require('express-validator')
const UserRoles = require("../config/userRoles")
const {
    checkToken,
    tokenTypes,
    restrictTo
} = require("simple-jwt-auth-protocol")


router.post("/signup", [
    check("email").isEmail().withMessage("Please use a valid email! "),
    check("firstName").isLength({ min: 2 }),
    check("lastName").isLength({ min: 2 }),
    check("password").isLength({ min: 6 })
        .withMessage("Minimum password length is 6 charachers"),
], userController.createUser)


router.post("/login", [
    check("email").isEmail().withMessage("Please use a valid email! "),
    check("password").isLength({ min: 6 })
], userController.login)


router.get("/activate", userController.activate)

router.get("/reset-password", userController.resetPassword)



router.get("/generate-session-token", checkToken(tokenTypes.MAIN), userController.generateUserSessionToken)

router.post("/set-roles", checkToken(), restrictTo([UserRoles.ADMIN]), userController.setRoles)

router.post("/change-password", [
    check("password").isLength({ min: 6 }).withMessage("Password lenght min is 6 charachers")
], checkToken(), userController.changePassword)


module.exports = router
