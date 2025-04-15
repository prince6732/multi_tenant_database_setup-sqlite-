// models/State.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

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
      defaultValue: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "states", // matches your actual MySQL table name
    timestamps: false, // disable createdAt/updatedAt
  }
);

module.exports = State;
