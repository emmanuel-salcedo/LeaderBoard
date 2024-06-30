const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // Disable logging in production
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This is important for Heroku Postgres
    },
  },
});

module.exports = sequelize;
