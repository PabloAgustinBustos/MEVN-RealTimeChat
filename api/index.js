const { Server } = require("socket.io")
const app = require("./app")
const connectDB = require("./db")
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

    io.on("connection", (socket) => {
        socket.emit("good-connection", "gracias por conectarte")
        
        socket.on("send-message", obj => {
            console.log("alguien mandó un mensaje")

            const message = {
                decoded:{
                    _id: obj.from
                },
                to: obj.to,
                text: obj.text
            }

            try{
                saveMessage(message, socket)
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
