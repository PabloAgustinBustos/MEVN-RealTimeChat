const User = require("../models/User")

async function checkFriend(req, res, next){
    const {_id, username} = req.body
    const {id: friend_id}  = req.params

    const {friends} = await User.findById(_id)
    
    const exists = friends.find(f => f._id === friend_id)
    
    console.log(exists)

    if(exists){
        console.log("ya tiene al amigo agregado")

        return res.status(400).json({message: "ya tenes ese amigo"})
    }

    console.log("es un amigo nuevo, se agregará")

    next()
}

module.exports = checkFriend