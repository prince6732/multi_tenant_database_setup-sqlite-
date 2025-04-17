const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const SubscriptionType = sequelize.define(
  "SubscriptionType",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
    },
    duration: {
      type: DataTypes.ENUM("week", "month", "halfYear", "Year"),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "subscription_types",
    timestamps: false,
  }
);

module.exports = SubscriptionType;
