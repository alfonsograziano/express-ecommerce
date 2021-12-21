const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Currencies = require("../config/currencies")
const currencies = Currencies.map(item => item.symbol)
const EUR = "EUR"


const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
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
    images: {
        primary: String,
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false
    },
    visible: {
        type: Boolean,
        required: true,
        default: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]

}, {
    timestamps: true,
})


const Product = mongoose.model("Product", productSchema)
module.exports = Product