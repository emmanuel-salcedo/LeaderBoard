const express = require('express');
const { Point, Church } = require('../models');
const router = express.Router();

// Middleware to update total points
const updateTotalPoints = async (churchId) => {
  try {
    const points = await Point.sum('points', { where: { ChurchId: churchId } });
    await Church.update({ totalPoints: points || 0 }, { where: { id: churchId } });
  } catch (error) {
    console.error(`Error updating total points for church ${churchId}:`, error);
    throw new Error(`Error updating total points for church ${churchId}`);
  }
};

// Create a point
router.post('/', async (req, res) => {
  try {
    const point = await Point.create(req.body);
    await updateTotalPoints(point.ChurchId);
    res.status(201).json(point);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a point by ID
router.get('/:id', async (req, res) => {
  try {
    const point = await Point.findByPk(req.params.id);
    if (!point) {
      return res.status(404).json({ error: 'Point not found' });
    }
    res.json(point);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching point' });
  }
});

// Update a point by ID
router.put('/:id', async (req, res) => {
  try {
    const point = await Point.findByPk(req.params.id);
    if (!point) {
      return res.status(404).json({ error: 'Point not found' });
    }
    await point.update(req.body);
    await updateTotalPoints(point.ChurchId);
    res.json(point);
  } catch (error) {
    res.status(500).json({ error: 'Error updating point' });
  }
});

// Delete a point by ID
router.delete('/:id', async (req, res) => {
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
    res.status(500).json({ error: 'Error deleting point' });
  }
});

module.exports = router;
