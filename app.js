const express = require("express");
const { Client } = require("pg");
const http = require("http");
const { Server } = require("socket.io"); 
const bodyParser = require("body-parser");
require("dotenv").config();
const userRouter = require("./router/user.router");
const matchRouter = require("./router/match.router"); 
const footballRouter = require("./router/football.router");
const cors = require("cors");

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Main route is working ✅");
});


app.use("/api/users", userRouter);
app.use("/api/matches", matchRouter); 
app.use("/api/football", footballRouter);

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});


app.set("io", io);

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






