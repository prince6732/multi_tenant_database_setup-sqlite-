const { execSync } = require("child_process");
const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require("fs");

// create sqlite database for tenant
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

// tenant model migrations
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

// tenant seeder
const runTenantSeeders = (dbName) => {
  const dbFilePath = path.resolve(
    __dirname,
    `../databases/tenantsDB/${dbName}.sqlite`
  );
  const tenantSeedPath = path.resolve("seeders/tenantSeeder"); // tenant seeder
  const commonSeedPath = path.resolve("seeders/commonSeeder"); // common seeder

  try {
    // execute cmd for tenant seeder
    execSync(
      `npx sequelize-cli db:seed:all --url sqlite:${dbFilePath} --seeders-path ${tenantSeedPath}`,
      { stdio: "inherit" }
    );
    // execute cmd for common seeder
    execSync(
      `npx sequelize-cli db:seed:all --url sqlite:${dbFilePath} --seeders-path ${commonSeedPath}`,
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
