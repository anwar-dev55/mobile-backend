const express = require('express');
const router = express.Router();
console.log("user.router.js is loaded");
const usercontroller = require('../controller/user.controller');

router.post('/register', usercontroller.register);
router.post('/login', usercontroller.login);
router.get("/", (req, res) => {
  res.send("Server is running successfully ✅");
});

module.exports = router;