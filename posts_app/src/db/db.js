const mongoose = require('mongoose')

async function connectDB(){
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to DB");
    
}

module.exports = connectDB