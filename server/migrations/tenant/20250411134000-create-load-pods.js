module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("load_pods", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      load_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "loads",
          key: "id",
        },
        onDelete: "RESTRICT",
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
      vehicle_number: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      driver_name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      driver_mobile: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      receiver_name: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      receiver_mobile: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      party_payment: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      driver_payment: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      party_payment_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      party_payment_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      driver_payment_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      driver_payment_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      load_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      pod_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      is_online: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      online_payment_details: {
        type: Sequelize.STRING(100),
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
    await queryInterface.dropTable("load_pods");
  },
};
