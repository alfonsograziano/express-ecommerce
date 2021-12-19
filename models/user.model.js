const mongoose = require("mongoose")
const Languages = require("../config/languages")
const UserRoles = require("../config/userRoles")

const Schema = mongoose.Schema


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        unique: true,
        required: true,
        trim: true,
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    lastPasswordChange: {
        type: Date,
        required:true
    },
    isActive: {
        required: true,
        type: Boolean
    },
    firstLogin: {
        required: true,
        type: Boolean
    },
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],
    roles: [{
        type: String,
        default: "user",
        enum: Object.values(UserRoles),
    }],
    preferences: {
        language: {
            type: String,
            enum: Object.values(Languages),
            default: Languages.EN
        },
    },
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
}, {
    timestamps: true,
})


const User = mongoose.model("User", userSchema)
module.exports = User