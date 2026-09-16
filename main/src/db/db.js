const mongoose = require('mongoose')

async function connectDB(){
    await mongoose.connect('mongodb+srv://yuvraj-singh:Yuvraj234783@notes-app.qhvgtdn.mongodb.net/databaseee"')
}

module.exports = connectDB


















// const mongoose = require("mongoose")

// async function connectDB(){
//     await mongoose.connect("mongodb+srv://yuvraj-singh:Yuvraj234783@notes-app.qhvgtdn.mongodb.net/Loki")
//     console.log("Connected to Database successfully")
// }

// module.exports = connectDB















// const mongoose = require("mongoose")

// async function connectDB(){
//     await mongoose.connect("mongodb+srv://yuvraj-singh:Yuvraj234783@notes-app.qhvgtdn.mongodb.net/halley")
//     console.log("Successsfully connected to Database");
    
// }

// module.exports = connectDB; 