module.exports = (sequelize, DataTypes) => {
  const ExpenseType = sequelize.define(
    "ExpenseType",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      is_primary: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "expense_types",
      timestamps: false,
    }
  );

  return ExpenseType;
};
