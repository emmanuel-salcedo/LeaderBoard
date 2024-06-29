const express = require('express');
const { League, Church } = require('../models');

const router = express.Router();

// Create a new league
router.post('/', async (req, res) => {
  try {
    const league = await League.create(req.body);
    res.status(201).json(league);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all leagues
router.get('/', async (req, res) => {
  try {
    const leagues = await League.findAll();
    res.status(200).json(leagues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single league by ID
router.get('/:id', async (req, res) => {
  try {
    const league = await League.findByPk(req.params.id, {
      include: [{ model: Church }]
    });
    if (!league) {
      return res.status(404).json({ error: 'League not found' });
    }
    res.status(200).json(league);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a league by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await League.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ error: 'League not found' });
    }
    const updatedLeague = await League.findByPk(req.params.id);
    res.status(200).json(updatedLeague);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a league by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await League.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'League not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
