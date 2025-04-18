const asyncHandler = require("../middlewares/asyncHandler");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const path = require("path");
const {
  createTenantDatabase,
  runTenantMigrations,
  runTenantSeeders,
} = require("../utils/dbUtils");
const { Tenant, User, TransportRequest } = require("../models/admin");

const createTransport = async (req, res) => {
  const {
    name,
    password,
    dbname,
    email,
    subscription_type_id,
    prefix,
    request_id,
  } = req.body;

  try {
    // Create tenant DB
    const dbName = `${prefix}_${dbname}`;
    await createTenantDatabase(dbName);
    runTenantMigrations(dbName);
    runTenantSeeders(dbName);

    // Create tenant record using Sequelize
    const tenant = await Tenant.create({
      name,
      dbname,
      prefix,
      email,
      subscription_type_id,
      activated_at: new Date(),
      deactivated_at: new Date(),
      status: true,
      city_id: 1,
    });

    // Update the admin user table to append tenant id using Sequelize
    await User.update({ tenant_id: tenant.id }, { where: { email: email } });

    // Update transport request status using Sequelize
    await TransportRequest.update(
      { status: "completed" },
      { where: { request_id: request_id } }
    );

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

    // Insert new user into tenant DB in user table using Sequelize query
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

const getFreshTransportRequests = asyncHandler(async (req, res) => {
  try {
    const transportRequests = await TransportRequest.findAll({
      where: {
        status: "fresh",
      },
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      success: true,
      transportRequests,
    });
  } catch (err) {
    console.error("Error fetching fresh transport requests:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch transport requests" });
  }
});

const getTransportRequestById = asyncHandler(async (req, res) => {
  const { request_id } = req.params;

  try {
    const transportRequest = await TransportRequest.findOne({
      where: { request_id },
    });

    if (!transportRequest) {
      return res.status(404).json({
        success: false,
        message: "Transport request not found",
      });
    }

    res.status(200).json({
      success: true,
      transportRequest,
    });
  } catch (err) {
    console.error("Error fetching transport request:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch transport request",
    });
  }
});

module.exports = {
  createTransport,
  getFreshTransportRequests,
  getTransportRequestById,
};
