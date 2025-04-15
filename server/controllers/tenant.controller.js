const prisma = require("../prisma/prismaClient/prismaClient");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const path = require("path");

const {
  createTenantDatabase,
  runTenantMigrations,
  runTenantSeeders,
} = require("../utils/dbUtils");

const activateUser = async (req, res) => {
  const { name, password, dbname, email, subscription_type_id, prefix, request_id } =
    req.body;

  try {
    // Create tenant DB
    const dbName = `${prefix}_${dbname}`;
    await createTenantDatabase(dbName);
    runTenantMigrations(dbName);
    runTenantSeeders(dbName);

    // Save tenant record in main DB using Prisma
    const tenant = await prisma.tenants.create({
      data: {
        name,
        dbname,
        prefix,
        email,
        subscription_type_id,
        activated_at: new Date(),
        deactivated_at: new Date(),
        status: true,
        city_id: 1,
      },
    });

    // update admin user table // append tenant id
    await prisma.users.update({
      where: {
        email: email,
      },
      data: {
        tenant_id: tenant.id,
      },
    });

    // update status of tranport request
    await prisma.transport_requests.update({
      where: {
        request_id: request_id,
      },
      data: {
        status: "completed",
      },
    });

    // Connect to the new tenant DB (SQLite)
    const dbFilePath = path.resolve(
      __dirname,
      `../databases/tenantsDB/${dbName}.sqlite`
    );
    const tenantSequelize = new Sequelize({
      dialect: "sqlite",
      storage: dbFilePath,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into tenant DB in user table
    await tenantSequelize.query(
      `INSERT INTO users (name, email, password, is_primary) VALUES (?, ?, ?, ?)`,
      {
        replacements: [name, email, hashedPassword, true],
      }
    );

    await tenantSequelize.close();

    return res.json({
      res: "success",
      message: "Tenant DB created and user added",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ res: "fail", message: err.message });
  }
};

module.exports = { activateUser };
