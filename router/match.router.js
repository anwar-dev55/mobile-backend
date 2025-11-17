const express = require("express");
const router = express.Router();
const matchController = require("../controller/match.controller");

router.get("/", matchController.getAllMatches);
router.get("/:id", matchController.getMatchById);
router.post("/", matchController.createMatch);
router.put("/:id/score", matchController.updateScore);
router.put("/:id/status", matchController.updateStatus);

module.exports = router;
