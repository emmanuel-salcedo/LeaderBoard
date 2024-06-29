const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/leaderboard', {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false
});

const League = require('./league')(sequelize, DataTypes);
const Church = require('./church')(sequelize, DataTypes);
const Point = require('./point')(sequelize, DataTypes);

League.hasMany(Church, { onDelete: 'SET NULL' });
Church.belongsTo(League);
Church.hasMany(Point, { onDelete: 'SET NULL' });
Point.belongsTo(Church);

module.exports = {
  sequelize,
  League,
  Church,
  Point
};
