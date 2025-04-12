const prisma = require("../prisma/prismaClient/prismaClient");

const {
  createTenantDatabase,
  runTenantMigrations,
  runTenantSeeders,
} = require("../utils/dbUtils");

const activateUser = async (req, res) => {
  const { name, dbname, email, subscription_type_id, prefix } = req.body;

  try {
    // Create tenant DB
    const dbName = `${prefix}_${dbname}`;

    await createTenantDatabase(dbName);
    runTenantMigrations(dbName);
    runTenantSeeders(dbName);

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
