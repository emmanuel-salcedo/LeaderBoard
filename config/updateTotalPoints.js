const Church = require('../server/models/church');
const Point = require('../server/models/point');

const updateTotalPoints = async (churchId) => {
  const points = await Point.sum('points', { where: { ChurchId: churchId } });
  await Church.update({ totalPoints: points }, { where: { id: churchId } });
};

module.exports = updateTotalPoints;
