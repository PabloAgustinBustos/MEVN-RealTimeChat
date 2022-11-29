const checkAuth = require("../middlewares/checkAuth")
const { getChat, sendMessage } = require("../controllers/chat")

const router = require("express").Router()

router.get("/auth/:id", checkAuth, getChat)
router.put("/auth", checkAuth, sendMessage)

module.exports = router