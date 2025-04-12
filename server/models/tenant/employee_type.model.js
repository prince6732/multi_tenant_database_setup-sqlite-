module.exports = (sequelize, DataTypes) => {
  const EmployeeType = sequelize.define(
    "EmployeeType",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(30),
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
      tableName: "employee_types",
      timestamps: false,
    }
  );

  return EmployeeType;
};
