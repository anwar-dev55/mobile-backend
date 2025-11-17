const express = require("express");
const router = express.Router();
const controller = require("../controller/football.controller");

router.get("/leagues", controller.getLeagues);
router.get("/matches/date/:date", controller.getMatchesByDate);
router.get("/match/:id", controller.getMatchDetails);

module.exports = router;
