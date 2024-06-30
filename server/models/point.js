const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Correct path
const Church = require('./church');

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

Point.addHook('afterCreate', async (point, options) => {
  await updateTotalPoints(point.ChurchId);
});

Point.addHook('afterUpdate', async (point, options) => {
  await updateTotalPoints(point.ChurchId);
});

Point.addHook('afterDestroy', async (point, options) => {
  await updateTotalPoints(point.ChurchId);
});

module.exports = Point;
