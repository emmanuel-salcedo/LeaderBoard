const { Model, DataTypes } = require('sequelize');

class Point extends Model {
  static init(sequelize) {
    super.init({
      description: DataTypes.STRING,
      value: DataTypes.INTEGER,
    }, { sequelize, modelName: 'Point' });
  }

  static associate(models) {
    this.belongsTo(models.Church, { foreignKey: 'churchId', as: 'church' });
  }
}

module.exports = Point;
