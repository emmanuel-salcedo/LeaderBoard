const express = require('express');
const { Church, Point, League } = require('../models');
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

// Create a church
router.post('/', async (req, res) => {
  try {
    const church = await Church.create(req.body);

    const initialPoint = {
      description: 'Initial Point',
      date: new Date(),
      points: 0, // or any default value you want to set
      ChurchId: church.id,
    };
    await Point.create(initialPoint);

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
    await updateTotalPoints(church.id);
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

// Get all churches
router.get('/', async (req, res) => {
  try {
    const churches = await Church.findAll({ include: [Point, League] });
    res.json(churches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a point to a church and update total points
router.post('/:id/points', async (req, res) => {
  try {
    const churchId = req.params.id;
    const point = await Point.create({ ...req.body, ChurchId: churchId });
    await updateTotalPoints(churchId);
    res.status(201).json(point);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit a point and update church total points
router.put('/points/:id', async (req, res) => {
  try {
    const point = await Point.findByPk(req.params.id);
    if (!point) {
      return res.status(404).json({ error: 'Point not found' });
    }
    const oldPoints = point.points;
    await point.update(req.body);
    const churchId = point.ChurchId;
    await updateTotalPoints(churchId);
    res.json(point);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a point and update church total points
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

module.exports = router;
