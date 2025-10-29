const express = require('express');
const router = express.Router();
console.log("user.router.js is loaded");
const usercontroller = require('../controller/user.controller');

router.post('/register', usercontroller.register);
router.post('/login', usercontroller.login);

module.exports = router;