module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("load_entries", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      truck_num: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      chassi: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      engine_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      owner_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      owner_number: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      owner_addr: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      pan: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      driver_name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      driver_number: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      driver_transport: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      trans_number: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      trans_city: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      driver_image: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      insurance: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      route_from: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      route_to: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      party_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      pickup_name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      pickup_number: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      pickup_addr: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      deliver_name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      deliver_no: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      deliver_addr: {
        type: Sequelize.STRING(50),
        allowNull: true,
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
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("load_entries");
  },
};
