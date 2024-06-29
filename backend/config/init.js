// config/init.js
const sequelize = require('./database');
const League = require('../backend/models/league');
const Church = require('../backend/models/church');
const Point = require('../backend/models/point');

async function initializeDatabase() {
    await sequelize.sync({ force: true });

    // Example data
    const league1 = await League.create({ name: 'League 1' });
    const church1 = await Church.create({ name: 'Church 1', LeagueId: league1.id });
    await Point.create({ description: 'Good Deed', points: 10, ChurchId: church1.id });

    console.log('Database initialized!');
}

initializeDatabase().catch(error => {
    console.error('Error initializing database:', error);
});
