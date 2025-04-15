const { exec } = require("child_process");
const Sequelize = require("sequelize");
const config = require("./config/db.config");

const sequelize = new Sequelize({
  username: config.USER,
  password: config.PASSWORD,
  host: config.HOST,
  dialect: config.dialect,
  port: config.port,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established, checking if database exists...");
    sequelize
      .query(`CREATE DATABASE IF NOT EXISTS ${config.DB}`)
      .then(() => {
        console.log(`Database ${config.DB} created (or already exists).`);

        // Run migrations
        exec(
          "npx sequelize-cli db:migrate --migrations-path=./migrations/superAdmin",
          (error, stdout, stderr) => {
            if (error) {
              console.error(`Migration error: ${error}`);
              console.error(error.stack);
              return;
            }
            console.log(`Migration stdout: ${stdout}`);
            console.error(`Migration stderr: ${stderr}`);

            // Run seeders after migration
            exec(
              "npx sequelize-cli db:seed:all --seeders-path=./seeders/commonSeeder",
              (seedError, seedOut, seedErr) => {
                if (seedError) {
                  console.error(`Seeder error: ${seedError}`);
                  console.error(seedError.stack);
                  return;
                }
                console.log(`Seeding stdout: ${seedOut}`);
                console.error(`Seeding stderr: ${seedErr}`);
              }
            );
            // run seeder cmd for user
            exec(
              "npx sequelize-cli db:seed:all --seeders-path=./seeders/adminSeeder",
              (seedError, seedOut, seedErr) => {
                if (seedError) {
                  console.error(`Seeder error: ${seedError}`);
                  console.error(seedError.stack);
                  return;
                }
                console.log(`Seeding stdout: ${seedOut}`);
                console.error(`Seeding stderr: ${seedErr}`);
              }
            );
          }
        );
      })
      .catch((err) => {
        console.error("Error creating database:", err);
      });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
