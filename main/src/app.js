const express = require("express")

const app = express()
const notes = []

app.use(express.json())


app.post("/notes" , (req , res)=>{
    notes.push(req.body)
    res.status(201).json({
        message : "Note Created successfully"
    })
})


app.get("/notes" , (req , res)=>{
    res.status(200).json({
        message : "Notes Fetched Successfully",
        notes : notes
    })
})


app.delete("/notes/:index" , (req, res)=>{
    const index = req.params.index

    delete notes[index]

    res.status(200).json({
        message: "Note Deleted Successfully"
    })
})



module.exports =  app

























// const express = require("express")

// const app = express()

// app.use(express.json())

// const notes = []

// app.post('/notes' , (req , res)=>{
//     console.log(req.body)

//         notes.push(req.body)

//     res.send("Note added successfully")
// })

// module.exports = app