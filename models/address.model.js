const mongoose = require("mongoose")
const Schema = mongoose.Schema


const addressSchema = new Schema({
    //TODO: understand what fields are required and what aren't
    firstName: String,
    lastName: String, 
    country: String,
    state: String,
    city: String,
    zip: String,
    address: String,
    notes: String
}, {
    timestamps: true,
})


const Address = mongoose.model("Address", addressSchema)
module.exports = Address