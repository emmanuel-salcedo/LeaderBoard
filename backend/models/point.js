module.exports = (sequelize, DataTypes) => {
  const Point = sequelize.define('Point', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  Point.associate = (models) => {
    Point.belongsTo(models.Church);
  };

  return Point;
};
