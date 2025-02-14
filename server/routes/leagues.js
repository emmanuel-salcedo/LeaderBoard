const express = require('express');
const { League, Church, Point } = require('../models');
const router = express.Router();

// Create a league
router.post('/', async (req, res) => {
  try {
    const league = await League.create(req.body);
    res.status(201).json(league);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit a league
router.put('/:id', async (req, res) => {
  try {
    const league = await League.findByPk(req.params.id);
    if (!league) {
      return res.status(404).json({ error: 'League not found' });
    }
    await league.update(req.body);
    res.json(league);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all leagues
router.get('/', async (req, res) => {
  try {
    const leagues = await League.findAll();
    res.json(leagues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a league
router.delete('/:id', async (req, res) => {
  try {
    const league = await League.findByPk(req.params.id);
    if (!league) {
      return res.status(404).json({ error: 'League not found' });
    }

    const churches = await Church.findAll({ where: { LeagueId: league.id } });
    for (const church of churches) {
      await Point.destroy({ where: { ChurchId: church.id } });
      await church.destroy();
    }

    await league.destroy();
    res.status(204).json({ message: 'League and associated churches deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all churches in a league
router.get('/:id/churches', async (req, res) => {
  try {
    const churches = await Church.findAll({ where: { LeagueId: req.params.id } });
    res.json(churches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get league by ID
router.get('/:id', async (req, res) => {
  try {
    const league = await League.findByPk(req.params.id, {
      include: [{ model: Church }],
    });
    if (!league) {
      return res.status(404).json({ error: 'League not found' });
    }
    res.json(league);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
