const express = require("express");
const { Client } = require("pg");
const http = require("http");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRouter = require("./router/user.router");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ جرب أولاً نضيف اختبار مباشر هنا
app.get("/", (req, res) => {
  res.send("Main route is working ✅");
});

// ✅ دي مهمه جدًا
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE;

if (!DATABASE_URL) {
  console.error("❌ DATABASE URL is missing! Check your .env or Railway Variables.");
  process.exit(1);
}

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







// const express = require('express');
// const userRoutes = require('./routes/users.routes');
// require('dotenv').config();

// const app = express();
// app.use(express.json());

// app.use(userRoutes);

// const PORT = 3000;
// app.listen(PORT, () => console.log(Server running on port ${PORT}));





