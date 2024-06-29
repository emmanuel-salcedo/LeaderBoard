module.exports = (sequelize, DataTypes) => {
  const Church = sequelize.define('Church', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    timestamps: true,
  });

  Church.associate = (models) => {
    Church.belongsTo(models.League);
    Church.hasMany(models.Point, { onDelete: 'SET NULL' });
  };

  return Church;
};
