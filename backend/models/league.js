const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const League = sequelize.define('League', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = League;
