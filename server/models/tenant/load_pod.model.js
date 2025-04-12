module.exports = (sequelize, DataTypes) => {
  const LoadPOD = sequelize.define(
    "LoadPOD",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      load_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      vehicle_number: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      driver_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      driver_mobile: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      receiver_name: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      receiver_mobile: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      party_payment: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      driver_payment: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      party_payment_status: {
        type: DataTypes.BOOLEAN,
      },
      party_payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      driver_payment_status: {
        type: DataTypes.BOOLEAN,
      },
      driver_payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      load_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      pod_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      online_payment_details: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      tableName: "load_pods",
      timestamps: true,
    }
  );

  return LoadPOD;
};
