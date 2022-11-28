const {Schema, SchemaTypes, model} = require("mongoose")
const {v4} = require("uuid")

const user = new Schema({
    _id: {
        type: SchemaTypes.UUID,
        default: v4()
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

        messages: [{
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

module.exports = model("user", user)