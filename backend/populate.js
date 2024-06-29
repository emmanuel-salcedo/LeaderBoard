const { Sequelize } = require('sequelize');
const { League, Church, Point } = require('./models');

const sequelize = new Sequelize('postgres://ud9urh2i1l73ib:p8df992f20b1c3fe167fac4428c2e209c4cbfc3ac9d7dfe18046bc3f57cb6b072@c5p86clmevrg5s.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d3uehslqbl6utl');

const populateDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync all models
    await sequelize.sync({ force: true });

    // Create sample data
    const league1 = await League.create({ name: 'League 1' });
    const league2 = await League.create({ name: 'League 2' });

    const churches = await Promise.all([
      Church.create({ name: 'Church 1', LeagueId: league1.id }),
      Church.create({ name: 'Church 2', LeagueId: league1.id }),
      Church.create({ name: 'Church 3', LeagueId: league2.id }),
      Church.create({ name: 'Church 4', LeagueId: league2.id }),
      Church.create({ name: 'Church 5', LeagueId: league1.id }),
      Church.create({ name: 'Church 6', LeagueId: league2.id })
    ]);

    await Promise.all([
      Point.create({ description: 'Won competition', value: 10, ChurchId: churches[0].id }),
      Point.create({ description: 'Charity work', value: 5, ChurchId: churches[1].id }),
      Point.create({ description: 'Community service', value: 7, ChurchId: churches[2].id }),
      Point.create({ description: 'Fundraising', value: 15, ChurchId: churches[3].id }),
      Point.create({ description: 'Mission trip', value: 20, ChurchId: churches[4].id }),
      Point.create({ description: 'Volunteer work', value: 8, ChurchId: churches[5].id }),
      Point.create({ description: 'Clean-up drive', value: 12, ChurchId: churches[0].id }),
      Point.create({ description: 'Sports event', value: 6, ChurchId: churches[1].id }),
      Point.create({ description: 'Youth camp', value: 14, ChurchId: churches[2].id }),
      Point.create({ description: 'Food donation', value: 9, ChurchId: churches[3].id })
    ]);

    console.log('Sample data has been populated successfully.');
  } catch (error) {
    console.error('Error populating test data:', error);
  } finally {
    await sequelize.close();
  }
};

populateDatabase();
