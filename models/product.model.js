const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        it: String
    },
    description: {
        it: String
    },
    price: Number,
    images: {
        primary: String,
    },
    deleted: {
        required: true,
        default: false
    },
    visible: {
        required: true,
        default: true
    },
    categories: [{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Address'
    }]

}, {
    timestamps: true,
})


const Product = mongoose.model("Product", productSchema)
module.exports = Product