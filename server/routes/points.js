const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Correct path
const express = require('express');
const { Point } = require('../models');
const { Church } = require('../models'); // Correct import

const router = express.Router();


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

module.exports = Point;
