module.exports = (sequelize, DataTypes) => {
  const Load = sequelize.define(
    "Load",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      is_internal: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      truck_number: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      truck_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      truck_details: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      driver_details: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      transport_details: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pickup: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      destination: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      client_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      driver_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      entry_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "loads",
      timestamps: true,
      paranoid: true,
    }
  );

  return Load;
};
