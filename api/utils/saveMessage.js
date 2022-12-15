const User = require("../models/User")


async function saveMessage({decoded: {_id: from}, to, text}, socket){
    console.log("from",from)
    console.log("to",to)
    const me = await User.findById(from)
    const him = await User.findById(to)

    me.friends.forEach(f => {
        if(f._id === to){
            f.messages.push({
                from: me._id,
                to: f._id,
                text
            })
        }
    })

    him.friends.forEach(f => {
        if(f._id === from){
            f.messages.push({
                from: me._id,
                to: him._id,
                text
            })
        }
    })

    await me.save()
    await him.save()

    if(socket){
        socket.emit("received")
    }
}

module.exports = saveMessage