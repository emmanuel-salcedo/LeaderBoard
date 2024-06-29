// models/point.js
module.exports = (sequelize, DataTypes) => {
    const Point = sequelize.define('Point', {
      description: DataTypes.STRING,
      points: DataTypes.INTEGER
    });
    Point.associate = function(models) {
      Point.belongsTo(models.Church, { foreignKey: 'churchId' });
    };
    return Point;
  };
  