const mongoose = require('mongoose')
const connectDB = require('../../../main/src/db/db')

async function connectDB(){
    await mongoose.connect()
}

module.exports = connectDB