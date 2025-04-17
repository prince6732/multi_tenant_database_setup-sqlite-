const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "admins",
    timestamps: false,
  }
);

module.exports = Admin;
