const getOrigin = require("../controllers/origin")

const router = require("express").Router()

router.get("/", getOrigin)

module.exports = router