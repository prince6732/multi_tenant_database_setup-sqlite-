module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("states", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("states");
  },
};
