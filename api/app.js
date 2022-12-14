const express = require("express")
const cors = require("cors")

const originRoutes = require("./routes/origin")
const usersRoutes = require("./routes/users")
const chatRoutes = require("./routes/chat")
const handleError = require("./middlewares/handleError")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/", originRoutes)
app.use("/user", usersRoutes)
app.use("/chat", chatRoutes)

app.use(handleError)

module.exports = app