const sequelize = require('./database');
const { League, Church, Point } = require('./models');

async function populate() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    const leagues = [];
    for (let i = 1; i <= 5; i++) {
      leagues.push(await League.create({ name: `League ${i}` }));
    }

    const churches = [];
    for (let i = 1; i <= 10; i++) {
      churches.push(await Church.create({ name: `Church ${i}`, LeagueId: leagues[Math.floor(Math.random() * leagues.length)].id }));
    }

    const points = [
      { description: 'Event 1', points: 100 },
      { description: 'Event 2', points: 150 },
      { description: 'Event 3', points: 200 },
      { description: 'Event 4', points: 50 },
      { description: 'Event 5', points: 300 },
      { description: 'Event 6', points: 75 },
      { description: 'Event 7', points: 125 },
      { description: 'Event 8', points: 175 },
      { description: 'Event 9', points: 250 },
      { description: 'Event 10', points: 350 }
    ];

    for (const church of churches) {
      for (const point of points) {
        await Point.create({ ...point, ChurchId: church.id });
      }
    }

    console.log('Test data populated successfully');
  } catch (error) {
    console.error('Error populating test data:', error);
  } finally {
    await sequelize.close();
  }
}

populate();
