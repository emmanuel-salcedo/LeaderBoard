const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const League = require('./league')(sequelize, DataTypes);
const Church = require('./church')(sequelize, DataTypes);
const Point = require('./point')(sequelize, DataTypes);

League.hasMany(Church, { as: 'churches' });
Church.belongsTo(League);
Church.hasMany(Point, { as: 'points' });
Point.belongsTo(Church);

const models = {
  League,
  Church,
  Point,
  sequelize,
  Sequelize
};

module.exports = models;
