const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    post : String,
    caption :String
})

const noteModel = mongoose.model("posts" , Schema)

module.exports = noteModel