const User = require("../models/User")

async function getUsers(req, res){
    try{
        const users = await User.find()

        console.log(users)

        return res.status(200).json(users)
    }catch(e){
        console.log("error al buscar usuarios", e)
        return res.status(400).json({message: "Hubo un error, lee la consola"})
    }
}

async function createUser(req, res){
    res.status(200).json({message: "create User"})
}

async function login(req, res){
    res.status(200).json({message: "login"})
}

module.exports = {
    getUsers,
    createUser,
    login
}