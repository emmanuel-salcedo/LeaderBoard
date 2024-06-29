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

Church.hasMany(Point, { foreignKey: 'ChurchId' });
Point.belongsTo(Church, { foreignKey: 'ChurchId' });

module.exports = Point;
