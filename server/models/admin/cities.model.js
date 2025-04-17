const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const City = sequelize.define(
  "City",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    state_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "cities",
    timestamps: false,
    paranoid: true, 
  }
);

module.exports = City;
