//points.js
const express = require('express');
const { Point, Church } = require('../models');
const router = express.Router();
const updateTotalPoints = require('../../utils/updateTotalPoints'); // Ensure this path is correct

// Create a new point
router.post('/', async (req, res) => {
  try {
    const { description, date, points, ChurchId } = req.body;
    if (!description || !date || !points || !ChurchId) {
      return res.status(400).json({ error: 'Description, date, points, and ChurchId are required' });
    }
    const point = await Point.create({ description, date, points, ChurchId });
    await updateTotalPoints(ChurchId);
    res.status(201).json(point);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a point
router.delete('/:id', async (req, res) => {
  try {
    const point = await Point.findByPk(req.params.id);
    if (!point) {
      return res.status(404).json({ error: 'Point not found' });
    }
    const ChurchId = point.ChurchId;
    await point.destroy();
    await updateTotalPoints(ChurchId);
    res.status(204).json({ message: 'Point deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a point
router.put('/:id', async (req, res) => {
  try {
    const point = await Point.findByPk(req.params.id);
    if (!point) {
      return res.status(404).json({ error: 'Point not found' });
    }
    const { description, date, points } = req.body;
    await point.update({ description, date, points });
    await updateTotalPoints(point.ChurchId);
    res.json(point);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
