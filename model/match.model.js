const pool = require("../db");

class MatchModel {
  static async getAll() {
    const res = await pool.query("SELECT * FROM matches ORDER BY start_time ASC");
    return res.rows;
  }

  static async getById(id) {
    const res = await pool.query("SELECT * FROM matches WHERE id = $1", [id]);
    return res.rows[0];
  }

  static async create(data) {
    const { home_team, away_team, start_time } = data;

    const res = await pool.query(
      `INSERT INTO matches (home_team, away_team, start_time)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [home_team, away_team, start_time]
    );

    return res.rows[0];
  }

  static async updateScore(id, home_score, away_score) {
    const res = await pool.query(
      `UPDATE matches
       SET home_score = $1, away_score = $2
       WHERE id = $3
       RETURNING *`,
      [home_score, away_score, id]
    );

    return res.rows[0];
  }

  static async updateStatus(id, status) {
    const res = await pool.query(
      `UPDATE matches
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    return res.rows[0];
  }
}

module.exports = MatchModel;
