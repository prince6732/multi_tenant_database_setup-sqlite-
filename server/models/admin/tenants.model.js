const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const Tenant = sequelize.define(
  "Tenant",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    prefix: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    dbname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
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
    image: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    subscription_type_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    city_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "tenants",
    timestamps: false,
  }
);

module.exports = Tenant;
