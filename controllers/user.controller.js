const User = require("../models/user.model")
const UserRoles = require("../config/userRoles")
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const keys = require("../config/keys")
const {
    generateMainToken,
    generateSessionToken,
} = require("simple-jwt-auth-protocol")

const createUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const email = req.body.email.trim().toLowerCase()
    const firstName = req.body.firstName.trim()
    const lastName = req.body.lastName.trim()
    const noHashedPassword = req.body.password.trim()

    var salt = bcrypt.genSaltSync(10)
    var password = bcrypt.hashSync(noHashedPassword, salt)

    const newUser = new User({
        email,
        password,
        firstName,
        lastName,
        firstLogin: true,
        isActive: false,
        roles: [UserRoles.USER],
        lastPasswordChange: new Date()
    })

    const user = await newUser.save()
    if (!user) return res.status(401).json("Error")

    return res.json("Account created!")
}


const login = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const email = req.body.email.trim().toLowerCase()
    const psw = req.body.password.trim()

    User.findOne({ email: email })
        .then(user => {
            if (!user) return res.status(301).json("User not found")
            if (!user.isActive) return res.status(301).json("Account non confirmed")

            if (bcrypt.compareSync(psw, user.password)) {
                const authToken = generateMainToken(user._id, user.roles, keys.SECRET, {}, user.lastPasswordChange)
                res.json({ authToken })
            }
            else res.status(400).json("Wrong password... Retry!")

        })
        .catch(() => {
            res.status(400).json("Cannot find email...")
        })
}


const activate = (req, res) => {
    User.findOne({ _id: req.query.id })
        .then(user => {
            user.isActive = true
            user.save()
            res.redirect(keys.SUCCESS_USER_ACTIVATION_URL)
        })
        .catch(() => res.redirect(keys.ERROR_USER_ACTIVATION_URL))
}


let differenceBetweenArrays = (arr1, arr2) => arr1.filter(x => !arr2.includes(x))

const setRoles = async (req, res) => {

    const roles = [... new Set(req.body.roles)]
    const allowed = Object.values(UserRoles)

    const difference = differenceBetweenArrays(roles, allowed)
    if (difference.length > 0)
        return res.status(422).json(`${JSON.stringify(difference)} are not valid roles `)


    const user = await User.findOne({ _id: req.body.user })
    if (!user) return res.status(301).json("User not found")

    user.roles = roles
    await user.save()
    res.json("User saved")
}


const generateUserSessionToken = async (req, res) => {
    const user = await User.findOne({_id:req.decoded.id})
    if(!user) res.status(404).json("User not found")

    try {
        const result = generateSessionToken(req.token, keys.SECRET, user.lastPasswordChange)
        res.json({ authToken: result })
    } catch (error) {
        res.status(301).json(error.message)
    }

}



module.exports = {
    createUser,
    login,
    activate,
    setRoles,
    generateUserSessionToken
}