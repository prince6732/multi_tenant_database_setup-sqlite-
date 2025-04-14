module.exports = {
  up: async (queryInterface, Sequelize) => {
    const isSQLite = queryInterface.sequelize.getDialect() === "sqlite";

    await queryInterface.createTable("cities", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });

    if (!isSQLite) {
      await queryInterface.addConstraint("cities", {
        fields: ["state_id"],
        type: "foreign key",
        name: "fk_cities_state_id",
        references: {
          table: "states",
          field: "id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
    }
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("cities");
  },
};
