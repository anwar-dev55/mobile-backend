const MatchModel = require("../model/match.model");
const pool = require("../DB/db");

exports.getAllMatches = async (req, res) => {
  try {
    const matches = await MatchModel.getAll();
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMatchById = async (req, res) => {
  try {
    const match = await MatchModel.getById(req.params.id);
    if (!match) return res.status(404).json({ message: "Match not found" });

    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMatch = async (req, res) => {
  try {
    const newMatch = await MatchModel.create(req.body);
    res.status(201).json(newMatch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateScore = async (req, res) => {
  try {
    const { home_score, away_score } = req.body;

    const updated = await MatchModel.updateScore(req.params.id, home_score, away_score);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await MatchModel.updateStatus(req.params.id, status);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


