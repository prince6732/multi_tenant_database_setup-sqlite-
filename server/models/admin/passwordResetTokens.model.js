const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const PasswordResetToken = sequelize.define(
  "PasswordResetToken",
  {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "password_reset_tokens",
    timestamps: false,
  }
);

module.exports = PasswordResetToken;
