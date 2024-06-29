const { Model, DataTypes } = require('sequelize');

class League extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    }, { sequelize, modelName: 'League' });
  }

  static associate(models) {
    this.hasMany(models.Church, { foreignKey: 'leagueId', as: 'churches' });
  }
}

module.exports = League;
