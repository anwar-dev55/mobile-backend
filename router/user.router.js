const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/user.controller');

router.post('/register', usercontroller.register);
router.post('/login', usercontroller.login);

module.exports = router;