const express = require('express');
const { Point } = require('../models');

const router = express.Router();

// Create a new point
router.post('/', async (req, res) => {
  try {
    const point = await Point.create(req.body);
    res.status(201).json(point);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all points
router.get('/', async (req, res) => {
  try {
    const points = await Point.findAll();
    res.status(200).json(points);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single point by ID
router.get('/:id', async (req, res) => {
  try {
    const point = await Point.findByPk(req.params.id);
    if (!point) {
      return res.status(404).json({ error: 'Point not found' });
    }
    res.status(200).json(point);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a point by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Point.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ error: 'Point not found' });
    }
    const updatedPoint = await Point.findByPk(req.params.id);
    res.status(200).json(updatedPoint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a point by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Point.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Point not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
