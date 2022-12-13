const { Server } = require("socket.io")
const app = require("./app")
const connectDB = require("./db")
const User = require("./models/User")
require("dotenv").config({path: `${__dirname}/.env`})

const {createServer} = require("http")


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

        // console.log("|", _id, "->", token, "|")

        // if(sessionID){
        //     // encuentra la sesión existente
        //     const session = sessions.find(sessionID)

        //     if(session){
        //         socket._id = session._id
        //         socket.sessionID = sessionID     
                
        //         return next()
        //     }
        // }
        // // public como un identificatorio para cambiar mensajes
        // const _id = socket.handshake.auth._id
        
        // socket._id = _id
        // socket.sessionID = sessionID

        next()
    })

    // io.of("/").adapter.on("join-room", (room, id) => {
    //     console.log(`socket ${id} has joined room ${room}`);
    // });

    // io.of("/").adapter.on("leave-room", (room, id) => {
    //     console.log(`socket ${id} has leaved room ${room}`);
    // });

    io.on("connection", async socket => {
        // socket.joing(socket._id)
        
        // console.log("|", socket._id, "->", socket.token, "|")
        
        sessions.push({
            _id: socket._id
        })

        console.log("new-sessions",sessions)

        // io.emit("user-connected", sessions.filter(client => client._id !== socket._id))
        io.emit("user-connected", sessions)

        socket.on("close-connection", async _id => {
            console.log("se desconectó", _id)
            
            sessions = sessions.filter(client => client._id !== _id)
            console.log("new sessions",sessions)

            socket.broadcast.emit("user-disconnected", sessions)
        })

        socket.on("send-message", obj => {
            const users = []

            for(let [id] of io.of("/").sockets){
                users.push(id)
            }

            console.log("mensaje de", obj.id)
            console.log("para", obj.to)

            io.to(obj.to).to(socket.id).emit("send-message", {
                from: socket._id,
                text: obj.text,
                to: obj.to,
            })
            // console.log("alguien mandó un mensaje")

            // const message = {
            //     decoded:{
            //         _id: obj.from
            //     },
            //     to: obj.to,
            //     text: obj.text
            // }

            // try{
            //     saveMessage(message, socket)
            // }catch(e){
            //     console.log("error", e)
            // }
        })
    })

    connectDB(process.env.MONGO_URI)
    app.listen(3001, () => console.log("server listening on port " + 3001))
    io.listen(3002)
}catch(e){
    console.log("error al conectar con la db o con express", e)
}
