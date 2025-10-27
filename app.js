const express = require("express");
const { Client } = require("pg");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoutes = require("./router/user.router");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

console.log("userRoutes loaded successfully")
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE;

if (!DATABASE_URL) {
  console.error("❌ DATABASE URL is missing! Check your .env or Railway Variables.");
  process.exit(1);
}

// ✅ تعديل الذكاء التلقائي للـ SSL
const client = new Client({
  connectionString: DATABASE_URL,
  ssl: DATABASE_URL.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

client
  .connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL successfully!");
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err.message);
  });

// ✅ Route للاختبار
app.get("/", (req, res) => {
  res.send("Server is running successfully ✅");
});








// const express = require('express');
// const userRoutes = require('./routes/users.routes');
// require('dotenv').config();

// const app = express();
// app.use(express.json());

// app.use(userRoutes);

// const PORT = 3000;
// app.listen(PORT, () => console.log(Server running on port ${PORT}));





