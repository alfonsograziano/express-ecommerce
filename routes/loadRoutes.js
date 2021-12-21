const {
    checkToken
} = require("simple-jwt-auth-protocol")

exports.loadRoutes = (app) => {

    app.use("/user", require("./user"))
    app.use("/product", require("./product"))
    app.use("/category", require("./category"))

    app.use("/order", checkToken(), require("./order"))


    // app.use((_, res) => res.redirect(keys.FALLBACK_URL))

}
