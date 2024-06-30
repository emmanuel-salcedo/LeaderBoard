// backend/routes/leagues.js
const express = require('express');
const router = express.Router();
const { League, Church } = require('../models');

// Get all leagues
router.get('/', async (req, res) => {
  try {
    const leagues = await League.findAll();
    res.json(leagues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all churches in a specific league
router.get('/:id/churches', async (req, res) => {
  try {
    const leagueId = req.params.id;
    const churches = await Church.findAll({ where: { LeagueId: leagueId } });
    res.json(churches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
