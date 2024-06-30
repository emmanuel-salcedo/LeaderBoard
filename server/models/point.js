// backend/models/point.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Corrected path
const Church = require('./church');

const Point = sequelize.define('Point', {
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ChurchId: {
    type: DataTypes.INTEGER,
    references: {
      model: Church,
      key: 'id'
    }
  }
});

Point.afterCreate(async (point, options) => {
  const church = await Church.findByPk(point.ChurchId);
  church.totalPoints += point.points;
  await church.save();
});

Point.afterDestroy(async (point, options) => {
  const church = await Church.findByPk(point.ChurchId);
  church.totalPoints -= point.points;
  await church.save();
});

Church.hasMany(Point, { foreignKey: 'ChurchId' });
Point.belongsTo(Church, { foreignKey: 'ChurchId' });

module.exports = Point;
