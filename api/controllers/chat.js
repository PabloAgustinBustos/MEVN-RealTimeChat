const User = require("../models/User")
const saveMessage = require("../utils/saveMessage")

async function getChat(req, res){
    const {decoded: {_id, username}} = req.body
    const {id: friend_id}  = req.params

    try{
        const {friends} = await User.findOne({_id}, {friends:1})

        const {messages} = friends.filter(f => f._id === friend_id)[0]
        
        // ordena desde el último mensaje hasta el más viejo
        const sortMessages = messages.sort((a,b) => b.timeStamp - a.timeStamp)

        res.status(200).json(sortMessages)
    }catch(e){
        console.log(e)
        res.status(404).json({message: "error", e})
    }
}

async function sendMessage(req, res){
    try{
        saveMessage(req.body)
    }catch(e){
        console.log(e)
    }

    res.status(200).json({
        message: "message was sended",
    })
}

module.exports={
    getChat,
    sendMessage
}