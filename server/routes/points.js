// backend/routes/points.js
const express = require('express');
const router = express.Router();
const { Point } = require('../models');

// Create a point
router.post('/', async (req, res) => {
  try {
    const point = await Point.create(req.body);
    res.status(201).json(point);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a point
router.delete('/:id', async (req, res) => {
  try {
    const point = await Point.findByPk(req.params.id);
    if (!point) {
      return res.status(404).json({ error: 'Point not found' });
    }
    await point.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
