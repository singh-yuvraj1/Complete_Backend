const mongoose = require('mongoose')
const connectDB = require('../../../main/src/db/db')



async function connectDB(){
    await mongoose.connect("mongodb+srv://yuvraj-singh:Yuvraj234783@notes-app.qhvgtdn.mongodb.net/halley")
}

module.exports = connectDB