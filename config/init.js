// config/init.js
const sequelize = require('./database');
const League = require('../server/models/league');
const Church = require('../server/models/church');
const Point = require('../server/models/point');

async function initializeDatabase() {
    try {
        // Drop existing tables and recreate them
        await sequelize.sync({ force: true });

        console.log('Database synchronized!');

        // Create leagues
        const league1 = await League.create({ name: 'Premier League' });
        const league2 = await League.create({ name: 'La Liga' });
        const league3 = await League.create({ name: 'Serie A' });

        // Create churches for league1
        const church1 = await Church.create({ name: 'Church 1', LeagueId: league1.id });
        const church2 = await Church.create({ name: 'Church 2', LeagueId: league1.id });

        // Create churches for league2
        const church3 = await Church.create({ name: 'Church 3', LeagueId: league2.id });
        const church4 = await Church.create({ name: 'Church 4', LeagueId: league2.id });

        // Create churches for league3
        const church5 = await Church.create({ name: 'Church 5', LeagueId: league3.id });
        const church6 = await Church.create({ name: 'Church 6', LeagueId: league3.id });

        // Create random points for testing
        const pointsData = [];
        for (let i = 0; i < 40; i++) {
            const churchId = Math.floor(Math.random() * 6) + 1;
            pointsData.push({
                description: `Random Point ${i + 1}`,
                date: new Date(),
                points: Math.floor(Math.random() * 100),
                ChurchId: churchId,
            });
        }
        await Point.bulkCreate(pointsData);

        // Additional churches for testing
        for (let i = 7; i <= 12; i++) {
            const leagueId = Math.floor(Math.random() * 3) + 1;
            await Church.create({ name: `Church ${i}`, LeagueId: leagueId });
        }

        // Recalculate total points for each church
        for (let i = 1; i <= 12; i++) {
            await updateTotalPoints(i);
        }

        console.log('Database initialized with example data!');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

async function updateTotalPoints(churchId) {
    const points = await Point.sum('points', { where: { ChurchId: churchId } });
    await Church.update({ totalPoints: points }, { where: { id: churchId } });
}

initializeDatabase().catch(error => {
    console.error('Error initializing database:', error);
});
