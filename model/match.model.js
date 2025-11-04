const pool = require('../DB/db');

const Match = {
  async getAll() {
    const result = await pool.query('SELECT * FROM matches ORDER BY start_time ASC');
    return result.rows;
  },

async create({ home_team, away_team, start_time, status, home_score = 0, away_score = 0 }) {
  const result = await pool.query(
    `INSERT INTO matches (home_team, away_team, start_time, status, home_score, away_score) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [home_team, away_team, start_time, status || 'upcoming', home_score, away_score]
  );
  return result.rows[0];
},

  async updateScore(id, home_score, away_score) {
    const result = await pool.query(
      `UPDATE matches SET home_score = $1, away_score = $2, status='live' WHERE id = $3 RETURNING *`,
      [home_score, away_score, id]
    );
    return result.rows[0];
  },

  async finish(id) {
    const result = await pool.query(
      `UPDATE matches SET status='finished' WHERE id=$1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  },
};

module.exports = Match;