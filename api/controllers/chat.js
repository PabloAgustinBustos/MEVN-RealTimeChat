const User = require("../models/User")

function getChat(req, res){
    const {decoded: {_id, username}} = req.body
    const {id: friend_id}  = req.params

    console.log(_id, username)
    console.log(friend_id)

    res.status(200).json({})
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
        // await User.updateOne({_id: from}, {
        //     $push: {messages: {from, to, text}}
        // })

        // await User.updateOne({_id: to}, {
        //     friends: {
        //         $push: {messages: {from, to, text}}
        //     }
        // })
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