const mongoose = require('mongoose')

const user_Schema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    confirmPassword : String
})

const userModel = mongoose.model("user" , user_Schema)


module.exports = userModel