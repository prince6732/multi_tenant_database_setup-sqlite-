"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const count = await queryInterface.sequelize.query(
      `SELECT COUNT(*) as count FROM expense_types`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (count[0].count === 0) {
      await queryInterface.bulkInsert("expense_types", [
        {
          id: 1,
          name: "Advertising",
          is_primary: true,
          status: true,
        },
        {
          id: 2,
          name: "Computer & Printer Maintenance",
          is_primary: true,
          status: true,
        },
        {
          id: 3,
          name: "Electricity Bill",
          is_primary: true,
          status: true,
        },
        {
          id: 4,
          name: "Electricity Repair",
          is_primary: true,
          status: true,
        },
        {
          id: 5,
          name: "Furniture",
          is_primary: true,
          status: true,
        },
        {
          id: 6,
          name: "Housekeeping",
          is_primary: true,
          status: true,
        },
        {
          id: 7,
          name: "Insurance",
          is_primary: true,
          status: true,
        },
        {
          id: 8,
          name: "Oil",
          is_primary: true,
          status: true,
        },
        {
          id: 9,
          name: "Pentry(Food & Tea)",
          is_primary: true,
          status: true,
        },
        {
          id: 10,
          name: "Stationary",
          is_primary: true,
          status: true,
        },
        {
          id: 11,
          name: "Travelling Expenses",
          is_primary: true,
          status: true,
        },
        {
          id: 12,
          name: "Truck Repair",
          is_primary: true,
          status: true,
        },
        {
          id: 13,
          name: "Truck Service",
          is_primary: true,
          status: true,
        },
      ]);
    } else {
      console.log("✅ Expense types table is already seeded");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("expense_types", null, {});
  },
};
