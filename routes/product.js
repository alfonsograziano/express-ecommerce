const router = require("express").Router()
const productController = require("../controllers/product.controller")
const { check } = require('express-validator')
const {
    checkToken,
    restrictTo
} = require("simple-jwt-auth-protocol")
const UserRoles = require("../config/userRoles")
const multer = require('multer')
const upload = multer({ dest: 'upload/' })


router.get("/", checkToken(), restrictTo([UserRoles.SHOP_MANAGER]), productController.get)


router.post("/add", [
    check("name").isLength({ min: 2 }),
    check("price").isNumeric(),
], checkToken(), restrictTo([UserRoles.SHOP_MANAGER]), productController.add)

router.delete("/delete", checkToken(), restrictTo([UserRoles.SHOP_MANAGER]), productController.deleteProduct)

router.get("/category", checkToken(), productController.getByCategory)


//All the updates 

router.post("/update/categories", checkToken(), restrictTo([UserRoles.SHOP_MANAGER]), productController.updateCategories)
router.post("/update/images/primary", checkToken(), restrictTo([UserRoles.SHOP_MANAGER]), upload.single('file'), productController.updatePrimaryImage)




module.exports = router
