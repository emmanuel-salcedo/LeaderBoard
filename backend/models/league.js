module.exports = (sequelize, DataTypes) => {
  const League = sequelize.define('League', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  League.associate = (models) => {
    League.hasMany(models.Church, { onDelete: 'SET NULL' });
  };

  return League;
};
