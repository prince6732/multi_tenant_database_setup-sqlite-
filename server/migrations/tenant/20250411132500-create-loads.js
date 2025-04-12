module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("loads", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      is_internal: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      truck_number: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      truck_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "trucks",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      truck_details: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      driver_details: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      transport_details: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pickup: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      destination: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "clients",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      client_number: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      driver_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "employees",
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
      entry_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable("loads");
  },
};
