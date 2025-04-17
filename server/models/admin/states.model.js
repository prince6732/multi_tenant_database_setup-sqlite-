const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const State = sequelize.define(
  "State",
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
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "states",
    timestamps: false,
    paranoid: true,
  }
);

module.exports = State;
