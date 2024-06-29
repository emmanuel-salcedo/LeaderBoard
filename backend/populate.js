const { League, Church, Point } = require('./models');

async function populateData() {
  await League.sync({ force: true });
  await Church.sync({ force: true });
  await Point.sync({ force: true });

  const league1 = await League.create({ name: 'League 1' });
  const league2 = await League.create({ name: 'League 2' });

  const churchA = await Church.create({ name: 'Church A', leagueId: league1.id, totalPoints: 0 });
  const churchB = await Church.create({ name: 'Church B', leagueId: league1.id, totalPoints: 0 });
  const churchC = await Church.create({ name: 'Church C', leagueId: league2.id, totalPoints: 0 });
  const churchD = await Church.create({ name: 'Church D', leagueId: league2.id, totalPoints: 0 });

  await Point.create({ description: 'Service Event', points: 10, churchId: churchA.id });
  await Point.create({ description: 'Fundraiser', points: 15, churchId: churchA.id });
  await Point.create({ description: 'Community Outreach', points: 20, churchId: churchB.id });
  await Point.create({ description: 'Charity Drive', points: 25, churchId: churchC.id });
  await Point.create({ description: 'Volunteer Work', points: 30, churchId: churchD.id });

  // Update totalPoints for each church
  const churches = [churchA, churchB, churchC, churchD];
  for (const church of churches) {
    const points = await Point.sum('points', { where: { churchId: church.id } });
    church.totalPoints = points;
    await church.save();
  }

  console.log('Test data populated successfully!');
}

populateData().catch(error => {
  console.error('Error populating test data:', error);
});
