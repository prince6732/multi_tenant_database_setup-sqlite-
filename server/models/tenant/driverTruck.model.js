module.exports = (sequelize, DataTypes) => {
  const DriverTruck = sequelize.define(
    "DriverTruck",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      truck_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_primary: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "driver_trucks",
      timestamps: false,
    }
  );

  DriverTruck.associate = (models) => {
    DriverTruck.belongsTo(models.Employee, {
      foreignKey: "employee_id",
      as: "employee",
    });
    DriverTruck.belongsTo(models.Truck, {
      foreignKey: "truck_id",
      as: "truck",
    });
  };

  return DriverTruck;
};
