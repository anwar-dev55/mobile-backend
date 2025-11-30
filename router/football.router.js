const express = require("express");
const router = express.Router();
const Controller = require("../controller/football.controller");

// 🔵 حفظ ماتشات النهارده
router.get("/load", Controller.loadTodayMatches);

// 🔵 ماتشات تاريخ معين
router.get("/date/:date", Controller.getMatchesByDate);

// 🔵 ماتشات قديمة
router.get("/past", Controller.getPastMatches);

// 🔵 تفاصيل مباراة
router.get("/fixture/:id", Controller.getFixtureDetails);

// 🔵 ترتيب دوري
router.get("/standings", Controller.getStandings);

// 🔵 إحصائيات فريق
router.get("/team-stats", Controller.getTeamStats);

//  احداث المباراة
router.get("/live-events", Controller.sendLiveEvents );
module.exports = router;
