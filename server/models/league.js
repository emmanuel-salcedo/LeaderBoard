const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const League = sequelize.define('League', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = League;
