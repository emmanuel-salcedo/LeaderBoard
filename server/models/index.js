const sequelize = require('../config/database');

const models = {
  League: require('./league'),
  Church: require('./church'),
  Point: require('./point'),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
