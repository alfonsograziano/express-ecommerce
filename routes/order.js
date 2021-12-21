const router = require("express").Router()
const orderController = require("../controllers/order.controller")


router.get("/", orderController.getMyOrders)


router.post("/pay", orderController.payOrder)


//The cart is handled as an order in the "draft" state
//So you can have an unique cart across multiple devices

router.get("/cart", orderController.getCart)

router.post("/cart/clear", orderController.deleteCart)

router.post("/cart/add-product", orderController.addToCart)

router.post("/cart/remove-product", orderController.removeFromCart)

router.post("/cart/confirm", orderController.confirmOrder)


module.exports = router
