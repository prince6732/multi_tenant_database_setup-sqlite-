const { execSync } = require("child_process");
const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require("fs");

const createTenantDatabase = async (dbName) => {
  const dbDir = path.resolve(__dirname, "../databases/tenantsDB");
  const dbFilePath = path.join(dbDir, `${dbName}.sqlite`);

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  if (!fs.existsSync(dbFilePath)) {
    console.log("Creating SQLite database...");

    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: dbFilePath,
    });

    try {
      await sequelize.authenticate();
      console.log(`SQLite DB created at ${dbFilePath}`);
    } catch (err) {
      console.error("Failed to create DB:", err.message);
    } finally {
      await sequelize.close();
    }
  } else {
    console.log(`SQLite DB already exists at ${dbFilePath}`);
  }
};

const runTenantMigrations = (dbName) => {
  const dbFilePath = path.resolve(
    __dirname,
    `../databases/tenantsDB/${dbName}.sqlite`
  );
  const migrationPath = path.resolve("migrations/tenant");
  const modelsPath = path.resolve("models");

  try {
    execSync(
      `npx sequelize-cli db:migrate --url sqlite:${dbFilePath} --migrations-path ${migrationPath} --models-path ${modelsPath}`,
      { stdio: "inherit" }
    );
  } catch (err) {
    throw new Error("Migration failed: " + err.message);
  }
};

const runTenantSeeders = (dbName) => {
  const dbFilePath = path.resolve(
    __dirname,
    `../databases/tenantsDB/${dbName}.sqlite`
  );
  const seedPath = path.resolve("seeders/tenant");

  try {
    execSync(
      `npx sequelize-cli db:seed:all --url sqlite:${dbFilePath} --seeders-path ${seedPath}`,
      { stdio: "inherit" }
    );
  } catch (err) {
    throw new Error("Seeding failed: " + err.message);
  }
};

module.exports = {
  createTenantDatabase,
  runTenantMigrations,
  runTenantSeeders,
};
