const sequelize = require('../config/database');
const League = require('./league');
const Church = require('./church');
const Point = require('./point');

League.hasMany(Church, { foreignKey: 'LeagueId' });
Church.belongsTo(League, { foreignKey: 'LeagueId' });

Church.hasMany(Point, { foreignKey: 'ChurchId' });
Point.belongsTo(Church, { foreignKey: 'ChurchId' });

module.exports = {
  sequelize,
  League,
  Church,
  Point
};
