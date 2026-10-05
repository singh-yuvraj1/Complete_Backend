const express = require('express')
const router = express.Router()
const authController = require("../controllers/auth.controller")


//post -- /api/auth/register
router.post("/register" , authController.registerUser)


module.exports = router;