const express = require('express')
const multer = require('multer')
const uploadFile = require('./services/storage.service')
const postModel = require('./models/post.model')

const app = express()


app.use(express.json())

const upload = multer({storage : multer.memoryStorage()})

// Create Post 

app.post('/create-post' ,upload.single('image') ,async (req , res)=>{
    
    // console.log(req.body);
    // console.log(req.file);
  try{
    const result =  await uploadFile(req.file.buffer)    
    // console.log(result);

    const post = await postModel.create({
      image_url : result.url,
      caption : req.body.caption
    })

    res.status(201).json({
      message : "Image uploaded successsfully",
      post
    })
  }catch(error){
    console.log(error);
    res.status(500).json({
      message: "Error Ocuurs",
      error : error.message
    })
  }
    
})



module.exports = app