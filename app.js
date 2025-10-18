const express = require("express");
const pg = require("pg");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
require("dotenv").config()
const userRoutes = require('./router/user.router');
const pool = require('./DB/db');



const app = express();
const server = http.createServer(app);
app.use(bodyParser.json())
app.use(express.urlencoded({extended : true}))



app.use('/api/users',userRoutes);





// connect db
const PORT = 3000
const DATABASE = process.env.DATABASE
const Client = new pg.Client(DATABASE)
Client.connect().then(function(){
    app.listen(PORT , function(){
        console.log(" DB is connected ");
    })
}).catch(function(err){
    console.error(" DB connection error ")
})













// const express = require('express');
// const userRoutes = require('./routes/users.routes');
// require('dotenv').config();

// const app = express();
// app.use(express.json());

// app.use(userRoutes);

// const PORT = 3000;
// app.listen(PORT, () => console.log(Server running on port ${PORT}));





