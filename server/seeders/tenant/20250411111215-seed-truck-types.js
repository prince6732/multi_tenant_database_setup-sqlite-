"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const count = await queryInterface.sequelize.query(
      `SELECT COUNT(*) as count FROM truck_types`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (count[0].count === 0) {
      await queryInterface.bulkInsert("truck_types", [
        {
          id: 1,
          name: "09 FT LMV (Light Motor Vehicles)",
          is_primary: true,
          status: true,
        },
        {
          id: 2,
          name: "10 FT LMV (Light Motor Vehicles)",
          is_primary: true,
          status: true,
        },
        {
          id: 3,
          name: "13 FT LCV -(Light commercial vehicle)",
          is_primary: true,
          status: true,
        },
        {
          id: 4,
          name: "13 FT Truck Transportation",
          is_primary: true,
          status: true,
        },
        {
          id: 5,
          name: "16 FT Truck Transportation",
          is_primary: true,
          status: true,
        },
        {
          id: 6,
          name: "16 Wheeler Trailer",
          is_primary: true,
          status: true,
        },
        {
          id: 7,
          name: "17 FT LCV -(Light commercial vehicle)",
          is_primary: true,
          status: true,
        },
        {
          id: 8,
          name: "19 FT LCV -(Light commercial vehicle)",
          is_primary: true,
          status: true,
        },
        {
          id: 9,
          name: "20 FT Containers Transportation",
          is_primary: true,
          status: true,
        },
        {
          id: 10,
          name: "20 FT Platform Truck Transportation",
          is_primary: true,
          status: true,
        },
        {
          id: 11,
          name: "20 FT Trailer",
          is_primary: true,
          status: true,
        },
        {
          id: 12,
          name: "21 FT Truck Transportation",
          is_primary: true,
          status: true,
        },
        {
          id: 13,
          name: "22 FT Platform Truck Transportation",
          is_primary: true,
          status: true,
        },
        {
          id: 14,
          name: "23 FT Truck Transportation",
          is_primary: true,
          status: true,
        },
        {
          id: 15,
          name: "24 FT Containers Transportation",
          is_primary: true,
          status: true,
        },
        {
          id: 16,
          name: "24 FT Platform Truck Transportation",
          is_primary: true,
          status: true,
        },
        {
          id: 17,
          name: "27 FT Truck Transportation",
          is_primary: true,
          status: true,
        },
        {
          id: 18,
          name: "28  FT Platform Truck (JCB) Transportation",
          is_primary: true,
          status: true,
        },
        {
          id: 19,
          name: "28 FT Containers Transportation",
          is_primary: true,
          status: true,
        },
        {
          id: 20,
          name: "30 FT Trailer",
          is_primary: true,
          status: true,
        },
        {
          id: 21,
          name: "32 FT Containers Transportation",
          is_primary: true,
          status: true,
        },
        {
          id: 22,
          name: "32 FT Platform Truck (JCB) Transportation",
          is_primary: true,
          status: true,
        },
        {
          id: 23,
          name: "40 FT Half Body Trailer",
          is_primary: true,
          status: true,
        },
        {
          id: 24,
          name: "40 FT High Bed(Flatbed) Trailer",
          is_primary: true,
          status: true,
        },
        {
          id: 25,
          name: "40 FT Semi Low Bed Trailer",
          is_primary: true,
          status: true,
        },
      ]);
    } else {
      console.log("✅ Truck types table is already seeded");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("truck_types", null, {});
  },
};
