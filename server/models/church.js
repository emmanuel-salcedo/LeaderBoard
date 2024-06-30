//server/models/church.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Correct path
const League = require('./league');

const Church = sequelize.define('Church', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalPoints: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  LeagueId: {
    type: DataTypes.INTEGER,
    references: {
      model: League,
      key: 'id',
    },
  },
});

League.hasMany(Church, { foreignKey: 'LeagueId' });
Church.belongsTo(League, { foreignKey: 'LeagueId' });

module.exports = Church;
