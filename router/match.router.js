const express = require('express');
const router = express.Router();
const matchController = require('../controller/match.controller');

router.get('/', matchController.getAllMatches);
router.post('/', matchController.addMatch);
router.post('/event', matchController.addEvent);

module.exports = router;