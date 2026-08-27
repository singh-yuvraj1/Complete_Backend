const express = require("express")

const app = express()

app.use(express.json())

const notes = []

app.post('/notes' , (req , res)=>{
    console.log(req.body)

        notes.push(req.body)

    res.send("Note added successfully")
})

module.exports = app