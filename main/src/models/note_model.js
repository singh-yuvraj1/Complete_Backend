const mongoose = require("mongoose");

const noteSchema = new mongoose.Schemaa({
    title : String,
    description : String
})


const noteModel = mongoose.model("note" , noteSchema)

module.exports = noteModel