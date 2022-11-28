const { getUsers, createUser, login } = require("../controllers/users")

const router = require("express").Router()

router.get("/", getUsers)
router.post("/register", createUser)
router.post("/auth/login", login)

module.exports = router