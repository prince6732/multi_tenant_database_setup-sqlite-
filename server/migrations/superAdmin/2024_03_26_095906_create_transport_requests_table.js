module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transport_requests", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      request_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      city_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "cities", // assuming 'cities' table exists
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      contact: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("fresh", "completed", "rejected"),
        allowNull: false,
        defaultValue: "fresh",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add foreign key reference to users
    await queryInterface.addConstraint("transport_requests", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_user_id_transport_requests",
      references: {
        table: "users", // assuming 'users' table exists
        field: "id",
      },
      onDelete: "RESTRICT",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("transport_requests");
  },
};
