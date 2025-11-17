const express = require("express");
const router = express.Router();
const controller = require("../controller/football.controller");

router.get("/load",controller.loadTodayMatches)

module.exports = router;
