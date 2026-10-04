const express = require('express')
const router = express.router()
const authController = require("./controllers/auth.controller")

router.post("register" , authController.registerUser)


module.exports = router