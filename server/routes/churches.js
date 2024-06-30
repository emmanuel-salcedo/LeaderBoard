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

    // Create initial random points for the new church
    const initialPoints = Math.floor(Math.random() * 100); // Random points between 0 and 99
    await Point.create({ description: 'Initial Random Points', date: new Date(), points: initialPoints, ChurchId: church.id });

    // Update the total points for the church
    await updateTotalPoints(church.id);

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
    await updateTotalPoints(church.id); // Ensure total points are updated
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

// Create a point
router.post('/:churchId/points', async (req, res) => {
  try {
    const { churchId } = req.params;
    const { description, points } = req.body;

    const church = await Church.findByPk(churchId);
    if (!church) {
      return res.status(404).json({ error: 'Church not found' });
    }

    const point = await Point.create({ description, date: new Date(), points, ChurchId: churchId });

    // Update the total points for the church
    await updateTotalPoints(churchId);

    res.status(201).json(point);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
