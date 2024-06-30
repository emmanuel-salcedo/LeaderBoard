const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Correct path
const express = require('express');
const router = express.Router();
const Church = require('./church'); // Ensure correct import

const Point = sequelize.define('Point', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ChurchId: {
    type: DataTypes.INTEGER,
    references: {
      model: Church,
      key: 'id',
    },
  },
});

Church.hasMany(Point, { foreignKey: 'ChurchId' });
Point.belongsTo(Church, { foreignKey: 'ChurchId' });

// Create a point
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
    const points = await Point.findAll({ include: [Church] });
    res.json(points);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get point by ID
router.get('/:id', async (req, res) => {
  try {
    const point = await Point.findByPk(req.params.id, { include: [Church] });
    if (!point) {
      return res.status(404).json({ error: 'Point not found' });
    }
    res.json(point);
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
    await point.update(req.body);
    res.json(point);
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
    await point.destroy();
    res.status(204).json({ message: 'Point deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
