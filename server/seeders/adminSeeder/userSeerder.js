"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [result] = await queryInterface.sequelize.query(
      `SELECT COUNT(*) AS count FROM users`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (parseInt(result.count) === 0) {
      const hashedPassword = await bcrypt.hash("root1234", 1);

      // Insert user
      await queryInterface.bulkInsert("users", [
        {
          name: "Administrator",
          email: "admin@topntech.com",
          password: hashedPassword,
          email_verified_at: new Date(),
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      // Fetch user ID manually
      const [user] = await queryInterface.sequelize.query(
        `SELECT id FROM users WHERE email = 'admin@topntech.com' LIMIT 1`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      if (user && user.id) {
        await queryInterface.bulkInsert("admins", [
          {
            user_id: user.id,
            status: true,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ]);
      } else {
        console.error("Admin user not found after insert");
      }
    } else {
      console.log("Users table already seeded");
    }
  },

  down: async (queryInterface) => {
    // Delete from admins first
    await queryInterface.sequelize.query(
      `DELETE FROM admins WHERE user_id = (SELECT id FROM users WHERE email = 'admin@topntech.com')`
    );

    await queryInterface.bulkDelete("users", {
      email: "admin@topntech.com",
    });
  },
};
