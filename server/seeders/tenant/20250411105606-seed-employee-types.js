"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const count = await queryInterface.sequelize.query(
      `SELECT COUNT(*) as count FROM employee_types`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (count[0].count === 0) {
      await queryInterface.bulkInsert("employee_types", [
        {
          id: 1,
          name: "Administrator",
          is_primary: true,
          status: true,
        },
        {
          id: 2,
          name: "Manager",
          is_primary: true,
          status: true,
        },
        {
          id: 3,
          name: "Assistant Manager",
          is_primary: true,
          status: true,
        },
        {
          id: 4,
          name: "Accountant",
          is_primary: true,
          status: true,
        },
        {
          id: 5,
          name: "Field Officer",
          is_primary: true,
          status: true,
        },
        {
          id: 6,
          name: "Data Entry Operator",
          is_primary: true,
          status: true,
        },
        {
          id: 7,
          name: "Driver",
          is_primary: true,
          status: true,
        },
        {
          id: 8,
          name: "Driver Helper",
          is_primary: true,
          status: true,
        },
      ]);
    } else {
      console.log("✅ Employee types table is already seeded");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("employee_types", null, {});
  },
};
