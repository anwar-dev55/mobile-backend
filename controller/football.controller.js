const FootballService = require("../services/football.service");

exports.loadTodayMatches = async (req, res) => {
  try {
    const fixtures = await FootballService.fetchAllMatches();
    const result = await FootballService.saveMatches(fixtures);
    res.json({
      inserted: fixtures.length,
      message: result.message
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};