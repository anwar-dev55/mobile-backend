const Match = require("../model/match.model");
const pool = require("../DB/db");

// ✅ Get all matches
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.getAll();
    res.json(matches);
  } catch (err) {
    console.error("Error fetching matches:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add new match
exports.addMatch = async (req, res) => {
  try {
    const { home_team, away_team, start_time, status } = req.body;

    // تأكيد إن البيانات الأساسية موجودة
    if (!home_team || !away_team || !start_time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await pool.query(
      `INSERT INTO matches (home_team, away_team, start_time, status, home_score, away_score)
       VALUES ($1, $2, $3, $4, 0, 0)
       RETURNING *`,
      [home_team, away_team, start_time, status || "upcoming"]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding match:", err);
    res.status(500).json({ message: "Error adding match" });
  }
};

// ✅ Add event (goal, yellow card, red card, etc.)
exports.addEvent = async (req, res) => {
  try {
    const { match_id, event_type, player_name, minute } = req.body;

    if (!match_id || !event_type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await pool.query(
      `INSERT INTO events (match_id, event_type, player_name, minute) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [match_id, event_type, player_name, minute]
    );

    const newEvent = result.rows[0];

    // ✅ بث Real-time (لو شغال Socket.io)
    const io = req.app.get("io");
    if (io) io.emit("new_event", newEvent);

    res.json(newEvent);
  } catch (err) {
    console.error("Add event error:", err);
    res.status(400).json({ message: err.message });
  }
};

