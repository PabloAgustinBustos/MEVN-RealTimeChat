const User = require("../models/User")
const jwt = require("jsonwebtoken")

async function getUsers(req, res){
    try{
        const users = await User.find({},{username:1, friends:1})

        return res.status(200).json(users)
    }catch(e){
        console.log("error al buscar usuarios", e)
        return res.status(400).json({message: "Hubo un error, lee la consola"})
    }
}

async function getUser(req, res){
    const {id} = req.params

    try{
        const user = await User.findById(id)

        return res.status(200).json(user)
    }catch(e){
        return res.status(400).json({message: "no se encuentra el user con ese id"})
    }
}

async function createUser(req, res){
    const {
        name,
        username,
        email,
        password
    } = req.body

    try{
        const resp = await User.create({
            name,
            username,
            email,
            password
        })

        // console.log(resp)
        
        return res.status(200).json({type: "good", msg: "account created"})
    }catch(e){
        console.log(e)
        
        return res.status(400).json({type: "bad", msg: "there is an error"})
    }
}

async function login(req, res){
    const {
        username,
        password
    } = req.body

    try{
        const resp = await User.findOne({
            username,
            password
        })
        
        if(!resp) return res.status(404).json({type:"bad", text: "user doesn't exist"})

        const token = jwt.sign({
            _id: resp._id,
            username,
        }, process.env.SECRET_KEY, {expiresIn: "30d"})

        return res.status(200).json({type:"good", token, text:"loading..."})
    }catch(e){
        console.log(e)
        return res.status(400).json({message: "Error en los campos", errors: e.errors})
    }
}

// get users who can be added to my friend list
async function getAllUsers(req, res){
    const {decoded:{_id, username}} = req.body

    try{
        const users = await User.find({
            _id: {
                $ne: _id
            },

            username: {
                $ne: username
            }
        })

        return res.status(200).json(users)
    }catch(e){
        console.log("error al buscar usuarios", e)
        return res.status(400).json({message: "Hubo un error, lee la consola"})
    }
}

async function addFriend(req, res){
    const {decoded:{_id, username}} = req.body
    const {id: friend_id}  = req.params

    try{
        const newFriend = await User.findOne({
            _id: {
                $eq: friend_id
            },
        }, {
            _id: 1,
            username: 1
        })

        if(!newFriend) return res.status(404).json({message: "there is no user with that id"})

        // console.log("voy a agregar a", newFriend)

        const me = await User.findOneAndUpdate({_id, username}, {
            $push: {
                friends: newFriend
            }
        })

        // console.log("ya lo agregué")

        await User.updateOne({_id: friend_id}, {
            $push: {
                friends: {
                    _id: me._id,
                    username: me.username
                }
            }
        })

        // console.log("ya me agregó")
        
        // console.log("me",me)
        // console.log("newFriend", newFriend)

        return res.status(200).json(newFriend)
    }catch(e){
        console.log("error al buscar usuarios", e)
        return res.status(400).json({message: "Hubo un error, lee la consola"})
    }
}

async function getFriends(req, res){
    const {decoded:{_id, username}} = req.body

    try{
        
        let {friends} = await User.findOne({_id})
        
        friends = friends.map(({_id, username}) => ({_id, username}))

        res.status(200).json(friends)
    }catch(e){
        return res.status(400).json({message: "error", e})
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    login,
    getAllUsers,
    addFriend,
    getFriends
}