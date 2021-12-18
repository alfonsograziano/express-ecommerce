const keys = require("../config/keys")


exports.loadRoutes = (app) => {

    app.use("/user", require("./user"))

    app.use((_, res) => res.redirect(keys.FALLBACK_URL))

}
