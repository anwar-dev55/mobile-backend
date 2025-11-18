const FootballService = require("../services/football.service");

// حفظ ماتشات النهاردة
exports.loadTodayMatches = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const fixtures = await FootballService.fixturesByDate(today);
  await FootballService.saveMatches(fixtures);
  res.json({ message: "Today's matches saved", count: fixtures.length });
};

// ماتشات يوم محدد
exports.getMatchesByDate = async (req, res) => {
  const date = req.params.date;
  const fixtures = await FootballService.fixturesByDate(date);
  res.json(fixtures);
};

// ماتشات قديمة
exports.getPastMatches = async (req, res) => {
  const { from, to } = req.query;
  const data = await FootballService.pastMatches(from, to);
  res.json(data);
};

// تفاصيل مباراة
exports.getFixtureDetails = async (req, res) => {
  const { id } = req.params;
  const data = await FootballService.fixtureDetails(id);
  res.json(data);
};

// ترتيب دوري
exports.getStandings = async (req, res) => {
  const { league, season } = req.query;
  const data = await FootballService.leagueStandings(league, season);
  res.json(data);
};

// إحصائيات فريق
exports.getTeamStats = async (req, res) => {
  const { league, season, team } = req.query;
  const data = await FootballService.teamStats(league, season, team);
  res.json(data);
};
