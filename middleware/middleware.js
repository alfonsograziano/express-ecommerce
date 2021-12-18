const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const rateLimit = require("express-rate-limit")

const checkToken = (req, res, next) => {
  let token = req.headers['authorization']
  if (typeof token === "undefined") return res.status(403).json({ success: false, message: 'Token is not defined' })

  if (token.startsWith('Bearer ')) token = token.slice(7, token.length)
  else res.status(403).json({ success: false, message: 'Token must start with Bearer' })

  if (!token) return res.json({ success: false, message: 'Auth token is not supplied' })

  jwt.verify(token, keys.SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ success: false, message: 'Token is not valid' })

    req.token = token
    req.decoded = decoded
    next()
  })

}


const temporarilyNotReachable = (req, res) => res.status(404).json("Cannot find API")


const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 15,
  handler: (req, res) => res.status(429).json({ "error": "You sent too many requests. Please try later" })
})

const intersect = (array1, array2) => array1.filter(value => array2.includes(value))
const restrictTo = users => {

  return function (req, res, next) {
    if (!(req && req.decoded && req.decoded.roles))
      return res.status(401).json("Access denied")

    const commonUsers = intersect(users, req.decoded.roles)
    if (commonUsers.length === 0)
      return res.status(401).json("Access denied, allowed users: " + users)

    next()
  }

}

module.exports = {
  apiRequestLimiter,
  checkToken,
  temporarilyNotReachable,
  restrictTo
}