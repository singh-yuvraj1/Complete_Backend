const express = require("express");

const app = express();            // created instance of server [means server is created but not started yet]


app.listen(3000,(req , res)=>{                           // listen starts the server 
    console.log("Server is started at port no 3000");   // just a call back message it will show when server gets started
})


//here 3000 is the port number used by express server 