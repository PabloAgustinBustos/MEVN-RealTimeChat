const jwt = require("jsonwebtoken")

function checkAuth(req, res, next){
    const { authorization: authHeader } = req.headers

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new Error("Not allowed to make that request")
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    req.body.decoded = decoded

    next()
}

module.exports = checkAuth