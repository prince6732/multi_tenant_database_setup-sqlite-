const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const Setting = sequelize.define(
  "Setting",
  {
    key: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT("medium"),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "settings",
    timestamps: false,
  }
);

module.exports = Setting;
