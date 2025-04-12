module.exports = (sequelize, DataTypes) => {
  const EmployeeAccount = sequelize.define(
    "EmployeeAccount",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      credit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      debit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      comment: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      payment_date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "employee_accounts",
      timestamps: true,
      paranoid: true,
    }
  );

  return EmployeeAccount;
};
