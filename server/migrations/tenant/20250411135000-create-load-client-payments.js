module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("load_client_payments", {
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
        allowNull: false,
        references: {
          model: "clients",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      pod_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        comment: "Proof of delivery date",
      },
      pod: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false,
      },
      paid_pod: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      pod_comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      load_payment: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      credit: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      labour: {
        type: Sequelize.DECIMAL(7, 2),
        defaultValue: 0,
      },
      paid_labour: {
        type: Sequelize.DECIMAL(7, 2),
        defaultValue: 0,
      },
      payment_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      details_json: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      comment: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("load_client_payments");
  },
};
