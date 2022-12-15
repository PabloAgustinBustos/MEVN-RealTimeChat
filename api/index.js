const { Server } = require("socket.io")
const app = require("./app")
const connectDB = require("./db")
const User = require("./models/User")
require("dotenv").config({path: `${__dirname}/.env`})

const {createServer} = require("http")
const saveMessage = require("./utils/saveMessage")


const server = createServer(app)

try{
    const io = new Server(server, {
        cors:{
            origin: "*"
        }
    })

    let sessions = []

    io.use((socket, next) => {
        // private para authenticate
        
        socket._id = socket.handshake.auth._id
        socket.token = socket.handshake.auth.token

        next()
    })

    io.on("connection", async socket => {
        socket.join(socket._id)
        
        // console.log("|", socket._id, "->", socket.token, "|")
        
        const isConnected = sessions.some(user => user._id === socket._id)

        if(!isConnected){
            sessions.push({
                _id: socket._id,
                id: socket.id
            })
        }

        console.log("new-sessions",sessions)

        io.emit("user-connected", sessions)

        socket.on("close-connection", async _id => {
            console.log("se desconectó", _id)
            
            sessions = sessions.filter(client => client._id !== _id)
            console.log("new sessions",sessions)

            socket.broadcast.emit("user-disconnected", sessions)
        })

        socket.on("send-message", obj => {

            console.log("mensaje de", obj.from)
            console.log("para", obj.to)

            io.to(obj.to).to(obj.from).emit("send-message", {
                from: socket._id,
                text: obj.text,
                to: obj.to,
            })
            // console.log("alguien mandó un mensaje")

            const message = {
                decoded:{
                    _id: obj.from
                },
                to: obj.to,
                text: obj.text
            }

            try{
                saveMessage(message)
            }catch(e){
                console.log("error", e)
            }
        })
    })

    connectDB(process.env.MONGO_URI)
    app.listen(3001, () => console.log("server listening on port " + 3001))
    io.listen(3002)
}catch(e){
    console.log("error al conectar con la db o con express", e)
}
