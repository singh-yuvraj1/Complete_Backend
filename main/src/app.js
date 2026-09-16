const express = require('express')
const noteModel = require('./models/note.model')
const app = express()


const notes =[]
app.use(express.json())

//CRUD  

//---------Post------------

app.post('/notes', async (req ,res)=>{
    data = req.body
    await noteModel.create({
      title : data.title,
      descrription : data.descrription  
    })
    res.status(201).json({
        message : "Note Created Suucessfully"
    })
})


//----------Get---------------------------

app.get('/notes' , async (req, res)=>{
    
    const notes = await noteModel.find()        //find always return an array , if not found returns empty array
    res.status(200).json({
        message : "Notes fetched successfully",
        notes: notes
    })
})


//-to find one specified  note
app.get('/notes', async(req, res)=>{
    const notes = await noteModel.findOne({
        title : text_title     /// it will find only such described title , if not found then raises NUll
    })
   
})


//----to delete 

app.delete('notes/:id' , async(req, res)=>{
    const id = req.params.id
    await noteModel.findOneAndDelete({
        _id : id
    })
    res.status(200).json({
        message: "Note deleted Successfully"
    })
})


module.exports = app






































// const express = require("express")
// const noteModel = require("./models/note.model")

// const app = express()

// const notes = []

// app.use(express.json())

// //---------------CRUD OPERATIONS----------------------

// //1. post 

// app.post("/notes" , async(req , res)=>{
//     const data = req.body
//     noteModel.create({
//         title : data.title ,
//         description : data.description 
//     })
//     res.status(201).send({
//         message : "Note created Successfully"
//     })
// })

// app.get("/notes" , (req , res)=>{
//     const notes = noteModel.find()
//     res.status(200).json({
//         message : "Notes fetched successfully",
//         notes : notes
//     })
// })



// module.exports = app





































// const express = require("express")
// const noteModel = require("./models/note.model")

// const app = express()
// const notes = []

// app.use(express.json())


// app.post("/notes" , (req , res)=>{
//     notes.push(req.body)
//     res.status(201).json({
//         message : "Note Created successfully"
//     })
// })


// app.get("/notes" , (req , res)=>{
//     res.status(200).json({
//         message : "Notes Fetched Successfully",
//         notes : notes
//     })
// })


// app.delete("/notes/:index" , (req, res)=>{
//     const index = req.params.index

//     delete notes[index]

//     res.status(200).json({
//         message: "Note Deleted Successfully"
//     })
// })


// app.patch("/notes/:index" , (req , res) =>{
//   const index = req.params.index
  
//   const description = req.body.description

//   notes[index].description = description

//   res.status(200).json({
//     message : "Note updated Succesfully"
//   })
// })



// module.exports =  app

























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