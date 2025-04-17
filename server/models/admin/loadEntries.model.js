const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const LoadEntry = sequelize.define(
  "LoadEntry",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    truck_num: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    chassi: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    engine_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    owner_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    owner_number: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    owner_addr: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pan: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    driver_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    driver_number: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    driver_transport: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    trans_number: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    trans_city: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    driver_image: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    insurance: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    route_from: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    route_to: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    party_id: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    pickup_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    pickup_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    pickup_addr: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    deliver_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    deliver_no: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    deliver_addr: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "load_entries",
    timestamps: false,
  }
);

module.exports = LoadEntry;
