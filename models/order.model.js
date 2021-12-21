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
    shipTo: {
        //I need to mantain redoundant info here 
        //So I can just import the address schema or copy it
        firstName: String,
        lastName: String,
        country: String,
        state: String,
        city: String,
        zip: String,
        address: String,
        notes: String
    }
}, {
    timestamps: true,
})


const Order = mongoose.model("Order", orderSchema)
module.exports = Order