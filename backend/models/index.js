const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // Disable logging or set to console.log for debugging
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.League = require('./league')(sequelize, DataTypes);
db.Church = require('./church')(sequelize, DataTypes);
db.Point = require('./point')(sequelize, DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
