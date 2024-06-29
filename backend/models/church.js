const { Model, DataTypes } = require('sequelize');

class Church extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      location: DataTypes.STRING,
    }, { sequelize, modelName: 'Church' });
  }

  static associate(models) {
    this.belongsTo(models.League, { foreignKey: 'leagueId', as: 'league' });
    this.hasMany(models.Point, { foreignKey: 'churchId', as: 'points' });
  }
}

module.exports = Church;
