require('dotenv').config()
const app = require('./src/app');
const connectDB = require('./src/config/db');

connectDB();

app.listen(3000, ()=>{
    console.log("server is running on port no 3000");
    
})










// require('dotenv').config()
// const connectDB = require('./src/db/db');
// const app = require('./src/app')

// connectDB()
// app.listen(3000 , ()=>{
//     console.log("Server is running on port no 3000");
// })









// require("dotenv").config()
// const app = require("./src/app")
// const connectDB = require('./db/db')

// connectDB()
// app.listen(3000, ()=>{
//     console.log("Server is running on port no 3000");
// })