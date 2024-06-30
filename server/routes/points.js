const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Church = require('./church');
const updateTotalPoints = require('../../config/updateTotalPoints'); // Correct path

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

Point.afterCreate(async (point) => {
  await updateTotalPoints(point.ChurchId);
});

module.exports = Point;
