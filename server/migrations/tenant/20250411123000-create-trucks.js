module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("trucks", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      truck_number: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      chassi: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      engine_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      model_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      truck_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "truck_types",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      description: {
        type: Sequelize.STRING(100),
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("trucks");
  },
};
