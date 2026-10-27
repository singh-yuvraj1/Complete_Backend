const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName :{
                type : String,
                required : true,
              },
    email    :{
                type : String,
                required : true,
                unique : true
              },
    password :{
                 type : String,
                required : true,
              }
})

const userModel = mongoose.model("Users" , userSchema  )

module.exports = userModel;













// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
// name: {
// type: String,
// required: true
// },
// email: {
// type: String,
// required: true,
// unique: true
// },
// password: {
// type: String,
// required: true
// }
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;



























// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//     userName: {
//         type: String,
//         required: true
//     },

//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },

//     password: {
//         type: String,
//         required: true
//     },

//     confirmPassword: {
//         type: String,
//         required: true
//     }
// });
// const userModel = mongoose.model("user" , userSchema)


// module.exports = userModel