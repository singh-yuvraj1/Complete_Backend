const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    image_url : String,
    caption :String
})

const postModel = mongoose.model("posts" , Schema)

module.exports = postModel