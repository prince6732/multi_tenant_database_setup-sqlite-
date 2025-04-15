"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tenants", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      prefix: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      dbname: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      activated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      deactivated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      image: {
        type: Sequelize.STRING(60),
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      subscription_type_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      city_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // Indexes
    await queryInterface.addIndex("tenants", ["city_id"]);

    // Foreign key: city_id
    await queryInterface.addConstraint("tenants", {
      fields: ["city_id"],
      type: "foreign key",
      name: "tenants_city_id_foreign",
      references: {
        table: "cities",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });

    // Foreign key: subscription_type_id
    await queryInterface.addConstraint("tenants", {
      fields: ["subscription_type_id"],
      type: "foreign key",
      name: "tenants_subscription_type_id_foreign",
      references: {
        table: "subscription_types",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("tenants");
  },
};
