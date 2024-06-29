  // models/church.js
  module.exports = (sequelize, DataTypes) => {
    const Church = sequelize.define('Church', {
      name: DataTypes.STRING,
      totalPoints: DataTypes.INTEGER
    });
    Church.associate = function(models) {
      Church.belongsTo(models.League, { foreignKey: 'leagueId' });
      Church.hasMany(models.Point, { foreignKey: 'churchId' });
    };
    return Church;
  };
  
  