const express = require("express");
const router = express.Router();
const controller = require("../controller/football.controller");

// 🔵 حفظ ماتشات النهارده
router.get("/load", controller.loadTodayMatches);

// 🔵 ماتشات تاريخ معين
router.get("/date/:date", controller.getMatchesByDate);

// 🔵 ماتشات قديمة
router.get("/past", controller.getPastMatches);

// 🔵 تفاصيل مباراة
router.get("/fixture/:id", controller.getFixtureDetails);

// 🔵 ترتيب دوري
router.get("/standings", controller.getStandings);

// 🔵 إحصائيات فريق
router.get("/team-stats", controller.getTeamStats);

module.exports = router;
