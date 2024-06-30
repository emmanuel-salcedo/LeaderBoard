// init.js
const sequelize = require('../config/database');
const League = require('../server/models/league');
const Church = require('../server/models/church');
const Point = require('../server/models/point');

async function initializeDatabase() {
    // Drop and recreate tables
    await sequelize.drop();
    await sequelize.sync({ force: true });

    // Example data
    const league1 = await League.create({ name: 'Premier League' });
    const league2 = await League.create({ name: 'Championship League' });

    const church1 = await Church.create({ name: 'Church Alpha', LeagueId: league1.id });
    const church2 = await Church.create({ name: 'Church Beta', LeagueId: league1.id });
    const church3 = await Church.create({ name: 'Church Gamma', LeagueId: league2.id });
    const church4 = await Church.create({ name: 'Church Delta', LeagueId: league2.id });
    const church5 = await Church.create({ name: 'Church Epsilon', LeagueId: league1.id });
    const church6 = await Church.create({ name: 'Church Zeta', LeagueId: league1.id });
    const church7 = await Church.create({ name: 'Church Eta', LeagueId: league2.id });
    const church8 = await Church.create({ name: 'Church Theta', LeagueId: league2.id });
    const church9 = await Church.create({ name: 'Church Iota', LeagueId: league1.id });
    const church10 = await Church.create({ name: 'Church Kappa', LeagueId: league2.id });

    const churches = [church1, church2, church3, church4, church5, church6, church7, church8, church9, church10];

    // Generate random points for each church
    for (const church of churches) {
        const numberOfPoints = Math.floor(Math.random() * 50) + 1;
        const pointsData = [];
        for (let i = 0; i < numberOfPoints; i++) {
            pointsData.push({
                description: `Random Point ${i + 1}`,
                date: new Date(),
                points: Math.floor(Math.random() * 500) + 1,
                ChurchId: church.id,
            });
        }
        await Point.bulkCreate(pointsData);
    }
    for (let i = 1; i <= 6; i++) {
        await updateTotalPoints(i);
    }

    console.log('Database initialized with example data!');

}

async function updateTotalPoints(churchId) {
    const points = await Point.sum('points', { where: { ChurchId: churchId } });
    await Church.update({ totalPoints: points }, { where: { id: churchId } });
}

initializeDatabase().catch(error => {
    console.error('Error initializing database:', error);
});

