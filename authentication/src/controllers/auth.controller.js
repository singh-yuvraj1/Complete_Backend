const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')


async function registerUser(req, res){
    const {userName , email , password } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if(isUserAlreadyExists){
        res.status(409).json({
            message : "User Already Exists"
        })
    }
    
    const user = await userModel.create({
        userName , email , password
    })

    const token = jwt.sign({
        id : user._id},
    process.env.JWT_SECRET)

    res.cookies("token" , token)

    res.status(201).json({
        message : "user created successfully"
    })

}


module.exports = {registerUser}























// const userModel = require('../models/user.model')
// const Jwt = require('jsonwebtoken')

// async function registerUser(req, res){
//     const {name , email , password} = req.body

//     const user = await userModel.create({
//         name, email, password
//     })
//     const token = Jwt.sign({
//         id :  user._id},
//         process.env.JWT_SECRET
//     )
//     res.cookie('token' , token )

//     res.status(201).json({
//         message : "User registered successfully",
//         user
//     })
// }
// module.exports = {registerUser}



















// const userModel = require("../models/user.model")
// const jwt = require("jsonwebtoken")

// async function registerUser(req, res) {

//     const { userName, email, password, confirmPassword } = req.body

//     const isUserAlreadyExists = await userModel.findOne({
//         email
//     })

//     if (isUserAlreadyExists){
//         return res.status(400).json({
//             message : "User Already Exists "
//         })
//     }

//     const user = await userModel.create({
//         userName,
//         email ,
//         password,
//         confirmPassword
//     })

//     const token = jwt.sign(
//         {
//             id: user._id
//         },
//         process.env.JWT_SECRET
//     )

//     res.cookie("token" , token)


//     res.status(201).json({
//         message: "User created successfully",
//         user,
//     })
// }

// module.exports = { registerUser }