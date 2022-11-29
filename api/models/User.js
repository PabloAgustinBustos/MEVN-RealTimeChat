const {Schema, SchemaTypes, model} = require("mongoose")
const {v4} = require("uuid")

const user = new Schema({
    _id: {
        type: SchemaTypes.UUID,
        default: () => v4()
    },

    name: {
        type: String,
        required: [true, "El campo name es obligatorio"],
    },

    username: {
        type: String,
        default: ""
    },

    email: {
        type: String,
        required: [true, "Campo email es obligatorio"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Campo contraseña es obligatorio"],
    },

    friends: [{
        _id: {
            type: SchemaTypes.UUID,
        },

        username: {
            type: String,
            required: true
        },

        messages: [{
            from: String,

            to: String,

            text: {
                type: String,
                max: 200
            },

            timeStamp: {
                type: SchemaTypes.Date,
                default: Date.now()
            }
        }]
    }]
})

async function breforeUpdate(){
    return new Promise((resolve, reject) => {
        if(true){
            resolve()
        }else{
            reject()
        }
    })
}

user.pre("updateOne", async(a, next) => {
    
    // await breforeUpdate()
})

module.exports = model("user", user)