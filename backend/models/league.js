// models/league.js
module.exports = (sequelize, DataTypes) => {
    const League = sequelize.define('League', {
      name: DataTypes.STRING
    });
    League.associate = function(models) {
      League.hasMany(models.Church, { foreignKey: 'leagueId' });
    };
    return League;
  };
  