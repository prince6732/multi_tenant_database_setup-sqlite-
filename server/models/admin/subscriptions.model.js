const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const Subscription = sequelize.define(
  "Subscription",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    payment_mode: {
      type: DataTypes.ENUM("bankTransfer", "cash", "card", "upi"),
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    transaction_details: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    tenant_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    subscription_type_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    activated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    deactivated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "subscriptions",
    timestamps: false,
    paranoid: true,
  }
);

module.exports = Subscription;
