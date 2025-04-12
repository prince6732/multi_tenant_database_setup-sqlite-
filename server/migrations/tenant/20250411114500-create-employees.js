module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("employees", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      employee_code: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      employee_type_id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      contact1: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      contact2: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      license: {
        type: Sequelize.STRING(16),
        allowNull: true,
      },
      adhaar: {
        type: Sequelize.STRING(12),
        allowNull: true,
      },
      guarantee: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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

    await queryInterface.addConstraint("employees", {
      fields: ["employee_type_id"],
      type: "foreign key",
      name: "fk_employees_employee_type_id",
      references: {
        table: "employee_types",
        field: "id",
      },
      onDelete: "RESTRICT",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("employees");
  },
};
