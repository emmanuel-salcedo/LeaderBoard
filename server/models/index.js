// backend/models/index.js
const sequelize = require('../../config/database');
const League = require('./league');
const Church = require('./church');
const Point = require('./point');

// Associations
League.hasMany(Church, { foreignKey: 'LeagueId' });
Church.belongsTo(League, { foreignKey: 'LeagueId' });
Church.hasMany(Point, { foreignKey: 'ChurchId' });
Point.belongsTo(Church, { foreignKey: 'ChurchId' });

// Sync the models
async function syncDatabase() {
    await sequelize.sync({ force: true });  // Change 'force' to false in production
    console.log('Database synced!');
}

syncDatabase();

module.exports = {
    sequelize,
    League,
    Church,
    Point
};
