const sequelize = require('../database');
const League = require('../backend/models/league');
const Church = require('../backend/models/church');
const Point = require('../backend/models/point');

const initDb = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Error syncing database: ", error);
  }
};

initDb();

