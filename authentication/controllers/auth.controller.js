const userModel = require("./models/userModel")

async function registerUser(req, res){
     const {userName , email , password , confirmPassword} = req.body

}

module.exports = {registerUser}