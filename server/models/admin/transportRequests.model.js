const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const TransportRequest = sequelize.define(
  "TransportRequest",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    request_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    city_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("fresh", "completed", "rejected"),
      defaultValue: "fresh",
    },
  },
  {
    tableName: "transport_requests",
    timestamps: false,
  }
);

module.exports = TransportRequest;
