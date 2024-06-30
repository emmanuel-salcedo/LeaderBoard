// backend/models/league.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Corrected path

const League = sequelize.define('League', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = League;
