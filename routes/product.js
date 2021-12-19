const router = require("express").Router()
const productController = require("../controllers/product.controller")
const { check } = require('express-validator')
const {
    checkToken,
    restrictTo
} = require("simple-jwt-auth-protocol")
const UserRoles = require("../config/userRoles")


router.get("/", checkToken(), restrictTo([UserRoles.SHOP_MANAGER]), productController.get)


router.post("/add", [
    check("name").isLength({ min: 2 }),
    check("price").isNumeric(),
], checkToken(), restrictTo([UserRoles.SHOP_MANAGER]), productController.add)

router.delete("/delete",  checkToken(), restrictTo([UserRoles.SHOP_MANAGER]), productController.deleteProduct)

router.delete("/update",  checkToken(), restrictTo([UserRoles.SHOP_MANAGER]), productController.update)




module.exports = router