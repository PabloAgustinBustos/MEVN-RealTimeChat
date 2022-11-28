const mongoose = require('mongoose');

async function connectDB(URI){
    await mongoose.connect(URI)
}

module.exports = connectDB