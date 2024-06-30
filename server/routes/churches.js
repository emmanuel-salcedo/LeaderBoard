const express = require('express');
const { Church, Point, League } = require('../models');
const updateTotalPoints = require('../utils/updateTotalPoints');
const router = express.Router();

// Create a church
router.post('/', async (req, res) => {
  try {
    const church = await Church.create(req.body);
    await Point.create({ description: 'Initial Points', date: new Date(), points: 0, ChurchId: church.id });
    await updateTotalPoints(church.id);
    res.status(201).json(church);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a point and update total points
router.post('/points', async (req, res) => {
  try {
    const point = await Point.create(req.body);
    await updateTotalPoints(point.ChurchId);
    res.status(201).json(point);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit a point and update total points
router.put('/points/:id', async (req, res) => {
  try {
    const point = await Point.findByPk(req.params.id);
    if (!point) {
      return res.status(404).json({ error: 'Point not found' });
    }
    await point.update(req.body);
    await updateTotalPoints(point.ChurchId);
    res.json(point);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a point and update total points
router.delete('/points/:id', async (req, res) => {
  try {
    const point = await Point.findByPk(req.params.id);
    if (!point) {
      return res.status(404).json({ error: 'Point not found' });
    }
    const churchId = point.ChurchId;
    await point.destroy();
    await updateTotalPoints(churchId);
    res.status(204).json({ message: 'Point deleted successfully' });
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
