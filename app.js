const express = require("express");
const pg = require("pg");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
require("dotenv").config()
const userRoutes = require('./router/user.router');
const pool = require('./DB/db');
const cors = require("cors")


const app = express();
const server = http.createServer(app);
app.use(bodyParser.json())
app.use(cors());
app.use(express.urlencoded({extended : true}))



app.use('/api/users',userRoutes);





// connect db
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is running successfully ✅');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


// app.get('/', (req,res)=>{
//     res.send('server is running successfuly ')
// })


// app.listen(PORT, () => {console.log('Server running on port ${PORT}');

// });










// const express = require('express');
// const userRoutes = require('./routes/users.routes');
// require('dotenv').config();

// const app = express();
// app.use(express.json());

// app.use(userRoutes);

// const PORT = 3000;
// app.listen(PORT, () => console.log(Server running on port ${PORT}));





