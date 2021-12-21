const Order = require("../models/order.model")
const OrderStatus = require("../config/orderStatus")
const Product = require("../models/product.model")


const getCart = async (req, res) => {
    const user = req.decoded.id

    const cart = await Order.findOne({ createdBy: user, status: OrderStatus.DRAFT })
    if (!cart) {
        return res.status(404).json("Your cart is empty")
    }

    res.json(cart)

}

const getMyOrders = async (req, res) => {
    const user = req.decoded.id

    const cart = await Order.find({ createdBy: user })
    if (!cart) {
        return res.status(404).json("Cannot find your orders")
    }

    res.json(cart)

}

const confirmOrder = async (req, res) => {
    const user = req.decoded.id

    const cart = await Order.findOne({ createdBy: user, status: OrderStatus.DRAFT })
    if (!cart) {
        return res.status(404).json("Cannot find your orders")
    }

    cart.status = OrderStatus.PENDING

    await cart.save()

    res.json("Order status set in pending")
}

const deleteCart = (req, res) => {
    const user = req.decoded.id

    Order.findOneAndDelete({ createdBy: user, status: OrderStatus.DRAFT })
        .then(() => {
            res.json("Cart cleared")
        })
        .catch(err => res.status(400).json(err))

}

const createEmptyCart = async (user) => {
    const cart = new Order({
        createdBy: user,
        status: OrderStatus.DRAFT,
        products: []
    })

    await cart.save()
    return cart
}


const addToCart = async (req, res) => {
    const user = req.decoded.id

    const productId = req.body.productId
    const quantity = req.body.quantity

    const product = await Product.findOne({ _id: productId, visible: true, deleted: false })
    if (!product) {
        return res.status(404).json(`Cannot find the product ${productId}`)
    }


    let cart = await Order.findOne({ createdBy: user, status: OrderStatus.DRAFT })
    if (!cart) cart = await createEmptyCart(user)

    const cartObj = cart.toObject()
    const orderedProduct = cartObj.products.find(item => item.product.toString() === productId)

    if (orderedProduct) {
        const filtered = cartObj.products.filter(item => item.product.toString() !== productId)
        const updatedOrderedProduct = {
            ...orderedProduct,
            quantity: orderedProduct.quantity + quantity,
            lastUpdate: new Date()
        }
        cart.products = [...filtered, updatedOrderedProduct]
    } else {
        const newOrderedProduct = {
            price: product.price,
            currency: product.currency,
            product: product._id,
            quantity: quantity,
            lastUpdate: new Date()
        }
        cart.products.push(newOrderedProduct)
    }

    await cart.save()

    res.json("Cart updated")

}

const removeFromCart = async (req, res) => {
    const user = req.decoded.id

    const productId = req.body.productId

    //In this case quantity can be null, if is null simply remove the entire item from the cart
    const quantity = req.body.quantity

    const cart = await Order.findOne({ createdBy: user, status: OrderStatus.DRAFT })
    if (!cart) return res.status(404).json("You have no cart, please create one")


    const cartObj = cart.toObject()
    const orderedProduct = cartObj.products.find(item => item.product.toString() === productId)
    if (!orderedProduct) return res.status(404).json("You have not this item in the cart...")

    const cartWithoutItem = cartObj.products.filter(item => item.product.toString() !== productId)

    if (typeof quantity !== "undefined" && quantity !== null) {
        const totalQuantity = orderedProduct.quantity - quantity
        if (totalQuantity <= 0) {
            cart.products = cartWithoutItem
        } else {
            cart.products = [
                ...cartWithoutItem,
                {
                    ...orderedProduct,
                    lastUpdate: new Date(),
                    quantity: totalQuantity
                }
            ]
        }

    } else {
        cart.products = cartWithoutItem
    }

    await cart.save()

    res.json("Cart updated")

}

const payOrder = async (req, res) => {

    //Here you can implement your preferred payment method
    //Just like Stripe, Paypal or, why not, Onlyfans (just kidding... maybe?)

    const user = req.decoded.id

    const orderId = req.body.orderId

    const order = await Order.findOne({
        _id: orderId,
        createdBy: user,
        status: OrderStatus.PENDING,
    })
    if (!order) return res.status(404).json("Cannot find this order")

    //Do some stuff....

    order.status = OrderStatus.FULLFILLED
    await order.save()

    res.json("Yeaaah you have your order :)")

}


module.exports = {
    confirmOrder,
    getCart,
    getMyOrders,
    deleteCart,
    addToCart,
    removeFromCart,
    payOrder
}