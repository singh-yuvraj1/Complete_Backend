const express = require('express')
const authController = require('../controllers/auth.controller')

const router = express.Router()


//post api
router.post("register" , authController.registerUser  )

module.exports = router;















// const express = require('express')
// const authController= require('../controllers/auth.controller')
// const router = express.Router()

// router.post("/register", authController.registerUser)

// module.exports = router;














// const express = require('express')
// const router = express.Router()
// const authController = require("../controllers/auth.controller")


// //post -- /api/auth/register
// router.post("/register" , authController.registerUser)


// module.exports = router;