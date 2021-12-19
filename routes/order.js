const router = require("express").Router()
const orderController = require("../controllers/order.controller")
const {
    checkToken,
    restrictTo
} = require("simple-jwt-auth-protocol")


router.get("/", checkToken(), orderController.getMyOrders)

router.post("/add", checkToken(), productController.add)



module.exports = router
