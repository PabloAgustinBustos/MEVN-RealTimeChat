const express = require("express")
const cors = require("cors")

const originRoutes = require("./routes/origin")
const handleError = require("./middlewares/handleError")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/", originRoutes)

app.use(handleError)

module.exports = app