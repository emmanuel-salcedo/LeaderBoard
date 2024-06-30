const { Point, Church } = require('../server/models');

const updateTotalPoints = async (churchId) => {
  const points = await Point.sum('points', { where: { ChurchId: churchId } });
  await Church.update({ totalPoints: points }, { where: { id: churchId } });
};

module.exports = updateTotalPoints;
