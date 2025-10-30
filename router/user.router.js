const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/user.controller');

console.log("✅ user.router.js is loaded");

// اختبار مباشر
router.get("/", (req, res) => {
  res.send("User router is working ✅");
});

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);

module.exports = router;