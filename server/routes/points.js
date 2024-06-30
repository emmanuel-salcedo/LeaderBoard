const express = require('express');
const { Point } = require('../models');
const router = express.Router();

// Create a point
router.post('/', async (req, res) => {
  try {
    const point = await Point.create(req.body);
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
    await point.destroy();
    res.status(204).json({ message: 'Point deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting point' });
  }
});

module.exports = router;
