const express = require('express');
const { Church, Point, League } = require('../models');
const router = express.Router();

// Middleware to update total points
const updateTotalPoints = async (churchId) => {
  const points = await Point.sum('points', { where: { ChurchId: churchId } });
  await Church.update({ totalPoints: points }, { where: { id: churchId } });
};

// Create a church
router.post('/', async (req, res) => {
  try {
    const church = await Church.create(req.body);
    res.status(201).json(church);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit a church
router.put('/:id', async (req, res) => {
  try {
    const church = await Church.findByPk(req.params.id);
    if (!church) {
      return res.status(404).json({ error: 'Church not found' });
    }
    await church.update(req.body);
    res.json(church);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a church
router.delete('/:id', async (req, res) => {
  try {
    const church = await Church.findByPk(req.params.id);
    if (!church) {
      return res.status(404).json({ error: 'Church not found' });
    }
    await church.destroy();
    res.status(204).json({ message: 'Church deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get church total points
router.get('/:id/points', async (req, res) => {
  try {
    const church = await Church.findByPk(req.params.id, { include: [Point] });
    if (!church) {
      return res.status(404).json({ error: 'Church not found' });
    }
    res.json(church);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get church league
router.get('/:id/league', async (req, res) => {
  try {
    const church = await Church.findByPk(req.params.id, { include: [League] });
    if (!church) {
      return res.status(404).json({ error: 'Church not found' });
    }
    res.json(church.League);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get church by ID
router.get('/:id', async (req, res) => {
  try {
    const church = await Church.findByPk(req.params.id, { include: [Point, League] });
    if (!church) {
      return res.status(404).json({ error: 'Church not found' });
    }
    res.json(church);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
