const express = require('express')
const authRoutes = require('./routes/auth.routes')
const app = express()

app.use(express.json())
app.use("/api/auth" , authRoutes)


module.exports = app;;























// const express = require('express')
// const authRoutes = require("./routes/auth.routes")
// const app = express()

// app.use(express.json())


// app.use("/api/auth" , authRoutes )


// module.exports = app








// const express = require('express')
// const app = express()
// const authRoutes = require("../routes/auth.routes")


// app.use(express.json())




// //post api 
// app.use("/api/auth" , authRoutes)

// module.exports = app
