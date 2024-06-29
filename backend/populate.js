const { League, Church, Point, sequelize } = require('./models');

async function populateData() {
  try {
    await sequelize.sync({ force: true });

    const league1 = await League.create({ name: 'League 1' });
    const league2 = await League.create({ name: 'League 2' });

    const church1 = await Church.create({ name: 'Church 1', LeagueId: league1.id });
    const church2 = await Church.create({ name: 'Church 2', LeagueId: league1.id });
    const church3 = await Church.create({ name: 'Church 3', LeagueId: league2.id });
    const church4 = await Church.create({ name: 'Church 4', LeagueId: league2.id });

    await Point.create({ description: 'Won a competition', points: 10, ChurchId: church1.id });
    await Point.create({ description: 'Community service', points: 5, ChurchId: church1.id });
    await Point.create({ description: 'Fundraising event', points: 20, ChurchId: church2.id });
    await Point.create({ description: 'Helping the homeless', points: 15, ChurchId: church2.id });
    await Point.create({ description: 'Community service', points: 25, ChurchId: church3.id });

    const churches = await Church.findAll();
    for (const church of churches) {
      const totalPoints = await Point.sum('points', { where: { ChurchId: church.id } });
      church.totalPoints = totalPoints;
      await church.save();
    }

    console.log('Database populated successfully!');
  } catch (error) {
    console.error('Error populating test data:', error);
  }
}

populateData();
