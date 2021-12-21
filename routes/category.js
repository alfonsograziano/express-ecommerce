const router = require("express").Router()
const {
    checkToken,
    restrictTo
} = require("simple-jwt-auth-protocol")
const UserRoles = require("../config/userRoles")
const categoryController = require("../controllers/category.controller")

router.get("/",checkToken(), categoryController.getCategories)

router.post("/add",checkToken(), restrictTo([UserRoles.SHOP_MANAGER]), categoryController.addCategory)
router.post("/update",checkToken(), restrictTo([UserRoles.SHOP_MANAGER]), categoryController.updateCategory)
router.delete("/delete",checkToken(), restrictTo([UserRoles.SHOP_MANAGER]), categoryController.deleteCategory)


module.exports = router
