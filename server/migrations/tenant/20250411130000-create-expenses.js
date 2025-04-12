module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("expenses", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      amount: {
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
      expense_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "expense_types",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("expenses");
  },
};
