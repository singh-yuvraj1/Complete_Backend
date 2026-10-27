const mongoose = require('mongoose')

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to Database");
}

module.exports = connectDB;












// const mongoose = require('mongoose')

// async function connectDB(){
//     await mongoose.connect(process.env.MONGO_URI)
//     console.log("connected to database")
// }

// module.exports = connectDB;









// const mongoose = require('mongoose')

// async function connectDB(){
//     await mongoose.connect(process.env.MONGO_URI)

//     console.log("Connected to Database");
    
// }

// module.exports = connectDB;