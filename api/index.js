const app = require("./app")
const connectDB = require("./db")
require("dotenv").config({path: `${__dirname}/.env`})

try{
    connectDB(process.env.MONGO_URI)
    app.listen(3001, () => console.log("server listening on port " + 3001))
}catch(e){
    console.log("error al conectar con la db o con express", e)
}
