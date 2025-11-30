const axios = require("axios");
const pool = require("../DB/db");
const { API_KEY, BASE_URL } = require("../config/football.config");

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "x-apisports-key": API_KEY }
});

async function updateLive(io) {
  try {
    // هات كل المباريات اللي شغالة الآن
    const runningMatches = await pool.query(
      `SELECT fixture_id FROM matches 
       WHERE status NOT IN ('FT', 'NS') 
       AND fixture_id IS NOT NULL`
    );

    for (const row of runningMatches.rows) {
      const fixtureId = row.fixture_id;

      const res = await api.get("/fixtures", { params: { id: fixtureId } });
      const match = res.data.response[0];

      if (!match) continue;

      const homeScore = match.goals.home ?? 0;
      const awayScore = match.goals.away ?? 0;
      const status = match.fixture.status.short;

      // ⬆ تحديث قاعدة البيانات
      await pool.query(
        `UPDATE matches 
         SET home_score=$1, away_score=$2, status=$3, last_update=NOW()
         WHERE fixture_id=$4`,
        [homeScore, awayScore, status, fixtureId]
      );

      // 🔥 ابعت التحديث للـ Socket.io
      io.emit("live:update", {
        fixture_id: fixtureId,
        home_score: homeScore,
        away_score: awayScore,
        status
      });
    }

    console.log("✔ Live updated");
  } catch (err) {
    console.log("Live update error:", err.message);
  }
}

module.exports = updateLive;
