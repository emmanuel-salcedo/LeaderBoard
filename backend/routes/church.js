const express = require('express');
const { Church, Point } = require('../models');

const router = express.Router();

// Create a new church
router.post('/', async (req, res) => {
  try {
    const church = await Church.create(req.body);
    res.status(201).json(church);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all churches
router.get('/', async (req, res) => {
  try {
    const churches = await Church.findAll();
    res.status(200).json(churches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all churches for a league
router.get('/league/:leagueId', async (req, res) => {
  try {
    const churches = await Church.findAll({ where: { LeagueId: req.params.leagueId } });
    res.status(200).json(churches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single church by ID
router.get('/:id', async (req, res) => {
  try {
    const church = await Church.findByPk(req.params.id, {
      include: [{ model: Point }]
    });
    if (!church) {
      return res.status(404).json({ error: 'Church not found' });
    }
    res.status(200).json(church);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a church by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Church.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ error: 'Church not found' });
    }
    const updatedChurch = await Church.findByPk(req.params.id);
    res.status(200).json(updatedChurch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a church by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Church.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Church not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
