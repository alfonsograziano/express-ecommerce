const OrderStatus = {
    DRAFT: {
        value: "draft",
        description: "This is the 'cart'. When an user add an item to the cart, a new order in draft is created"
    },
    PENDING: {
        value:"pending",
        description:"When you click che checkout page, the orer becomes in pending",
    },
    FULLFILLED:{
        value: "fullfilled",
        description:"When you complete the order and the payment is fullfilled the order becomes fullfilled"
    },
    CANCELED:{
        value: "canceled",
        description:"If an user requires the cancellation of the order, it becomes canceled"
    }
}

module.exports = OrderStatus