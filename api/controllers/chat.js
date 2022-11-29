const User = require("../models/User")

async function getChat(req, res){
    const {decoded: {_id, username}} = req.body
    const {id: friend_id}  = req.params

    try{
        const {friends} = await User.findOne({_id}, {friends:1})

        const {messages} = friends.filter(f => f._id === friend_id)[0]
        
        // ordena desde el último mensaje hasta el más viejo
        const sortMessages = messages.sort((a,b) => b.timeStamp.getTime() - a.timeStamp.getTime())

        res.status(200).json(sortMessages)
    }catch(e){
        console.log(e)
        res.status(404).json({message: "error", e})
    }
}

async function sendMessage(req, res){
    const {from, to, text} = req.body

    try{
        const me = await User.findById(from)
        const him = await User.findById(to)

        me.friends.forEach(f => {
            if(f._id === to){
                f.messages.push({
                    from,
                    to,
                    text
                })
            }
        })

        him.friends.forEach(f => {
            if(f._id === from){
                f.messages.push({
                    from,
                    to,
                    text
                })
            }
        })

        me.save()
        him.save()
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