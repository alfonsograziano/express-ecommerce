const mongoose = require("mongoose")
const Schema = mongoose.Schema
const OrderStatus = require("../config/orderStatus")
const Currencies = require("../config/currencies")
const currencies = Currencies.map(item => item.symbol)
const EUR = "EUR"


const orderSchema = new Schema({
    products: [{
        price: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true,
            default: EUR,
            enum: Object.values(currencies),
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        lastUpdate: Date
    }],
    status: {
        type: String,
        default: "draft",
        enum: Object.values(OrderStatus),
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    shipTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        //This field is not required in case of digital products
        required: false
    }
}, {
    timestamps: true,
})


const Order = mongoose.model("Order", orderSchema)
module.exports = Order