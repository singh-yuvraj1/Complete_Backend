const mongoose = require("mongoose")

async function connectDB(){
    await mongoose.connect()
    console.log("Successsfully connected to Database");
    
}

module.exports = connectDB; 