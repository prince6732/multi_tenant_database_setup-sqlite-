module.exports = (sequelize, DataTypes) => {
  const Truck = sequelize.define(
    "Truck",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      truck_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
      chassi: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      engine_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      model_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      truck_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "trucks",
      timestamps: true,
    }
  );

  Truck.associate = (models) => {
    Truck.belongsTo(models.TruckType, {
      foreignKey: "truck_type_id",
      as: "truckType",
    });
  };

  return Truck;
};
