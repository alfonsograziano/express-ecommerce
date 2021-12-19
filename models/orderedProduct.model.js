const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Currencies = require("../config/currencies")
const currencies = Currencies.map(item => item.symbol)
const EUR = "EUR"

const productSchema = new Schema({
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
    }
}, {
    timestamps: true,
})


const Product = mongoose.model("Product", productSchema)
module.exports = Product