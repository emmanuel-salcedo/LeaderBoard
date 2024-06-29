const Sequelize = require('sequelize');
const sequelize = require('../../config/database'); // Corrected path

const League = require('./league');
const Church = require('./church');
const Point = require('./point');

League.init(sequelize);
Church.init(sequelize);
Point.init(sequelize);

League.associate({ Church });
Church.associate({ League, Point });

module.exports = {
  sequelize,
  League,
  Church,
  Point
};
