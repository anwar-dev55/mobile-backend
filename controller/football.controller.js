const football = require("../services/football.service");

module.exports = {
  getLeagues: async (req, res) => {
    try {
      const data = await football.getLeagues();
      res.json(data);
    } catch (err) {
      res.status(500).send("Error fetching leagues");
    }
  },

  getMatchesByDate: async (req, res) => {
    try {
      const { date } = req.params;
      const data = await football.getMatchesByDate(date);
      res.json(data);
    } catch (err) {
      res.status(500).send("Error fetching matches");
    }
  },

  getMatchDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await football.getMatchDetails(id);
      res.json(data);
    } catch (err) {
      res.status(500).send("Error fetching match details");
    }
  },
};
