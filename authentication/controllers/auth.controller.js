const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function registerUser(req, res) {

    const { userName, email, password, confirmPassword } = req.body

    const user = await userModel.create({
        userName,
        email,
        password,
        confirmPassword
    })

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.status(201).json({
        message: "User created successfully",
        user,
        token
    })
}

module.exports = { registerUser }