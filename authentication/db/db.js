const mongoose = require('mongoose')

async function connectDB(){
    await mongoose.connect('mongodb+srv://yuvraj-singh:Yuvraj234783@notes-app.qhvgtdn.mongodb.net/user_data')

    console.log("Connected to Database");
    
}

module.exports = connectDB;