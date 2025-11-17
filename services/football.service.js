const axios = require("axios");
const pool = require("../DB/db"); // لو انت عامل db.js
const { API_KEY, BASE_URL } = require("../config/football.config");

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "x-apisports-key": API_KEY }
});

class FootballService {

  // جلب كل المباريات اليوم لكل الدوريات
  static async fetchAllMatches() {
    try {
      const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const res = await api.get("/fixtures", { params: { date } });
      return res.data.response;
    } catch (err) {
      console.error("Football API Error:", err.response?.data || err.message);
      return [];
    }
  }

  // حفظ المباريات في DB
  static async saveMatches(fixtures) {
    for (const f of fixtures) {
      const homeTeam = f.teams.home.name;
      const awayTeam = f.teams.away.name;
      await pool.query(
        `INSERT INTO matches (home_team, away_team, start_time, status, home_score, away_score)
         VALUES ($1,$2,$3,$4,$5,$6)
         ON CONFLICT DO NOTHING`,
        [
          homeTeam,
          awayTeam,
          f.fixture.date,
          f.fixture.status.short,
          f.goals.home ?? 0,
          f.goals.away ?? 0
        ]
      );
    }
    return { message: "Matches saved successfully" };
  }
}

module.exports = FootballService;