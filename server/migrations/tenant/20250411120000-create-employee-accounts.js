module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("employee_accounts", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      credit: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      debit: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      comment: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      payment_date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal("CURRENT_DATE"),
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint("employee_accounts", {
      fields: ["employee_id"],
      type: "foreign key",
      name: "fk_employee_accounts_employee_id",
      references: {
        table: "employees",
        field: "id",
      },
      onDelete: "RESTRICT",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("employee_accounts");
  },
};
