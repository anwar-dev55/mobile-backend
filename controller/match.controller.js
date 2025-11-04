const Match = require('../model/match.model');
const pool = require('../DB/db');

exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.getAll();
    res.json(matches);
  } catch (err) {
    console.error('Error fetching matches:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addMatch = async (req, res) => {
  try {
    const { home_team, away_team, start_time } = req.body;
    const match = await Match.create({ home_team, away_team, start_time });
    res.json(match);
  } catch (err) {
    console.error('Add match error:', err);
    res.status(400).json({ message: err.message });
  }
};

exports.addEvent = async (req, res) => {
  try {
    const { match_id, event_type, player_name, minute } = req.body;
    const result = await pool.query(
      `INSERT INTO events (match_id, event_type, player_name, minute) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [match_id, event_type, player_name, minute]
    );

    const newEvent = result.rows[0];

    // ✅ بث Real-time
    const io = req.app.get("io");
    io.emit("new_event", newEvent);

    res.json(newEvent);
  } catch (err) {
    console.error("Add event error:", err);
    res.status(400).json({ message: err.message });
  }
};
