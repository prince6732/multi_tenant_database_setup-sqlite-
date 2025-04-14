module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "City",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "cities",
      timestamps: false,
      paranoid: true,
      underscored: true,
    }
  );

  City.associate = (models) => {
    City.belongsTo(models.State, {
      foreignKey: "state_id",
      onDelete: "RESTRICT",
    });
  };

  return City;
};
