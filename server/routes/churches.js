// backend/routes/churches.js
const express = require('express');
const router = express.Router();
const { Church, Point } = require('../models');

// Get all churches
router.get('/', async (req, res) => {
  try {
    const churches = await Church.findAll();
    res.json(churches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all points for a specific church
router.get('/:id/points', async (req, res) => {
  try {
    const churchId = req.params.id;
    const points = await Point.findAll({ where: { ChurchId: churchId } });
    res.json(points);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
