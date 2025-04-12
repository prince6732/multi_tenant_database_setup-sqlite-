module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("driver_trucks", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "employees",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      truck_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "trucks",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      is_primary: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("driver_trucks");
  },
};
