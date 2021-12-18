const router = require("express").Router()
const userController = require("../controllers/user.controller")
const { check } = require('express-validator')
const {
    checkToken,
    restrictTo
} = require("../middleware/middleware")
const UserRoles = require("../config/userRoles")

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

router.post("/set-roles", checkToken, restrictTo([UserRoles.ADMIN]), userController.setRoles)



module.exports = router
