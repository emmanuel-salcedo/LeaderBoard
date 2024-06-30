const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Correct path

const League = sequelize.define('League', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = League;
