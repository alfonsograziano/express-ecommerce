const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const routes = require("./routes/loadRoutes")
const keys = require("./config/keys")
const v8 = require("v8")
const logger = require("./services/logger")

require("log-timestamp")
require("dotenv").config()

const app = express()
const http = require("http").createServer(app)

const BYTES = 1024
const DIGITS = 2
const totalHeapSizeInGB = (v8.getHeapStatistics().total_available_size / BYTES / BYTES / BYTES).toFixed(DIGITS)

logger.info("*******************************************")
logger.info(`Total Heap Size ~${totalHeapSizeInGB}GB`)
logger.info("*******************************************")

app.use(cors())
app.use(express.urlencoded({ "extended": true }))
app.use(express.json({}))

const DEFAULT_PORT = 5000
const port = keys.PORT || DEFAULT_PORT
http.listen(
    port,
    () => {

        const environment = keys.NODE_ENV
        logger.info(`Server running on port ${port} in the ${environment} environment`)

        mongoose.connect(
            keys.ATLAS_URI,
            {
                "useNewUrlParser": true,
                "useUnifiedTopology": true
            },
            (err) => {
                if (err) {
                    logger.error("Error connecting to DB")
                    logger.error(err)
                }
            }
        )
        const { connection } = mongoose
        connection.once(
            "open",
            () => {
                logger.info("DB connection made")
                routes.loadRoutes(app)
            }
        )
    }
)
