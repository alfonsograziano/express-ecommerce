const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderStatus = require("../config/orderStatus")
const orderStatusValues = Object.values(OrderStatus).map(item => item.value)

const orderSchema = new Schema({   
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderedProducts'
    }],
    status: {
        type:String,
        default: "draft",
        enum: orderStatusValues,
    },
    total: Number, 
}, {
    timestamps: true,
})


const Order = mongoose.model("Order", orderSchema)
module.exports = Order