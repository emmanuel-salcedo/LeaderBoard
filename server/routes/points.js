const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Church = require('../models/church'); // Ensure correct import path

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
      model: 'Churches', // Ensure correct table name
      key: 'id',
    },
  },
});

module.exports = Point;
