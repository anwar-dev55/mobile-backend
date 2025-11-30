const axios = require("axios");
const pool = require("../DB/db");
const { API_KEY, BASE_URL } = require("../config/football.config");

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "x-apisports-key": API_KEY }
});

class FootballService {

  // ماتشات حسب اليوم
  static async fixturesByDate(date) {
    const res = await api.get("/fixtures", { params: { date } });
    return res.data.response;
  }

  // ماتشات قديمة (من - إلى)
  static async pastMatches(from, to) {
    const res = await api.get("/fixtures", { params: { from, to } });
    return res.data.response;
  }

  // تفاصيل مباراة واحدة
  static async fixtureDetails(fixtureId) {
    const res = await api.get("/fixtures", { params: { id: fixtureId } });
    return res.data.response[0];
  }

  // ترتيب دوري معين
  static async leagueStandings(leagueId, season) {
    const res = await api.get("/standings", { params: { league: leagueId, season } });
    return res.data.response[0].league.standings[0];
  }

  // إحصائيات فريق
  static async teamStats(leagueId, season, teamId) {
    const res = await api.get("/teams/statistics", {
      params: { league: leagueId, season, team: teamId }
    });
    return res.data.response;
  }

  // حفظ ماتشات اليوم للـ DB
  static async saveMatches(fixtures) {
    for (const f of fixtures) {
      await pool.query(
        `INSERT INTO matches (home_team, away_team, start_time, status, home_score, away_score)
         VALUES ($1,$2,$3,$4,$5,$6)
         ON CONFLICT DO NOTHING`,
        [
          f.teams.home.name,
          f.teams.away.name,
          f.fixture.date,
          f.fixture.status.short,
          f.goals.home ?? 0,
          f.goals.away ?? 0
        ]
      );
    }
    return { message: "Matches saved successfully" };
  }

static emitLiveUpdate(io, fixture) {
  io.emit("live:update", {
    fixture_id: fixture.fixture.id,
    home_team: fixture.teams.home.name,
    away_team: fixture.teams.away.name,
    home_score: fixture.goals.home,
    away_score: fixture.goals.away,
    status: fixture.fixture.status.short
  });
}

}

module.exports = FootballService;
