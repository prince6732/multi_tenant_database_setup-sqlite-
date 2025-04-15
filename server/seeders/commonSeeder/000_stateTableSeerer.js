"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const count = await queryInterface.sequelize.query(
      `SELECT COUNT(*) as count FROM states`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (parseInt(count[0].count, 10) === 0) {
      await queryInterface.bulkInsert("states", [
        { id: 1, name: "Andaman and Nicobar Islands", status: false },
        { id: 2, name: "Andhra Pradesh", status: false },
        { id: 3, name: "Arunachal Pradesh", status: false },
        { id: 4, name: "Assam", status: false },
        { id: 5, name: "Bihar", status: false },
        { id: 6, name: "Chandigarh", status: false },
        { id: 7, name: "Chhattisgarh", status: false },
        { id: 8, name: "Dadra and Nagar Haveli", status: false },
        { id: 9, name: "Daman and Diu", status: false },
        { id: 10, name: "Delhi", status: false },
        { id: 11, name: "Goa", status: false },
        { id: 12, name: "Gujarat", status: false },
        { id: 13, name: "Haryana", status: false },
        { id: 14, name: "Himachal Pradesh", status: false },
        { id: 15, name: "Jammu and Kashmir", status: false },
        { id: 16, name: "Jharkhand", status: false },
        { id: 17, name: "Karnataka", status: false },
        { id: 18, name: "Kerala", status: false },
        { id: 19, name: "Lakshadweep", status: false },
        { id: 20, name: "Madhya Pradesh", status: false },
        { id: 21, name: "Maharashtra", status: false },
        { id: 22, name: "Manipur", status: false },
        { id: 23, name: "Meghalaya", status: false },
        { id: 24, name: "Mizoram", status: false },
        { id: 25, name: "Nagaland", status: false },
        { id: 26, name: "Odisha", status: false },
        { id: 27, name: "Pondicherry", status: false },
        { id: 28, name: "Punjab", status: false },
        { id: 29, name: "Rajasthan", status: false },
        { id: 30, name: "Sikkim", status: false },
        { id: 31, name: "Tamil Nadu", status: false },
        { id: 32, name: "Telangana", status: false },
        { id: 33, name: "Tripura", status: false },
        { id: 34, name: "Uttar Pradesh", status: false },
        { id: 35, name: "Uttarakhand", status: false },
        { id: 36, name: "West Bengal", status: false },
      ]);
    } else {
      console.log("States table is already seeded");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("states", null, {});
  },
};
