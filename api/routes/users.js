const { getUsers, createUser, login, getUser, getAllUsers, addFriend, getFriends } = require("../controllers/users")
const checkAuth = require("../middlewares/checkAuth")
const checkFriend = require("../middlewares/checkFriend")

const router = require("express").Router()

router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/register", createUser)
router.post("/login", login)
router.post("/auth/get", checkAuth, getAllUsers)
router.put("/auth/add/:id", checkAuth, checkFriend, addFriend)
router.get("/auth/friends", checkAuth, getFriends)

module.exports = router