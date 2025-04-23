const asyncHandler = require("../middlewares/asyncHandler");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const path = require("path");
const {
  createTenantDatabase,
  runTenantMigrations,
  runTenantSeeders,
} = require("../utils/dbUtils");
const {
  Tenant,
  User,
  TransportRequest,
  City,
  State,
  SubscriptionType,
} = require("../models/admin");

const createTransport = async (req, res) => {
  const { name, dbname, email, subscription_type_id, activated_at, prefix } =
    req.body;
  const { request_id } = req.params;

  try {
    const transportRequest = await TransportRequest.findOne({
      where: { request_id },
    });
    if (!transportRequest) {
      return res
        .status(404)
        .json({ res: "fail", message: "Transport request not found" });
    }

    const { city_id, user_id } = transportRequest;

    const user = await User.findOne({ where: { id: user_id } });
    if (!user || !user.password) {
      return res
        .status(404)
        .json({ res: "fail", message: "User not found or password missing" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const subscription = await SubscriptionType.findOne({
      where: { id: subscription_type_id },
    });
    if (!subscription) {
      return res
        .status(400)
        .json({ res: "fail", message: "Subscription type not found" });
    }

    const activatedDate = new Date(activated_at);
    let deactivated_at = null;

    switch (subscription.duration) {
      case "week":
        deactivated_at = new Date(activatedDate);
        deactivated_at.setDate(deactivated_at.getDate() + 7);
        break;
      case "month":
        deactivated_at = new Date(activatedDate);
        deactivated_at.setMonth(deactivated_at.getMonth() + 1);
        break;
      case "halfYear":
        deactivated_at = new Date(activatedDate);
        deactivated_at.setMonth(deactivated_at.getMonth() + 6);
        break;
      case "Year":
        deactivated_at = new Date(activatedDate);
        deactivated_at.setFullYear(deactivated_at.getFullYear() + 1);
        break;
      default:
        return res.status(400).json({
          res: "fail",
          message: "Invalid subscription type duration",
        });
    }

    const dbName = `${prefix}_${dbname}`;
    await createTenantDatabase(dbName);
    runTenantMigrations(dbName);
    runTenantSeeders(dbName);

    const tenant = await Tenant.create({
      name,
      dbname,
      prefix,
      email,
      subscription_type_id,
      activated_at,
      deactivated_at,
      status: true,
      city_id,
    });

    await User.update({ tenant_id: tenant.id }, { where: { id: user_id } });

    await TransportRequest.update(
      { status: "completed" },
      { where: { request_id } }
    );

    const dbFilePath = path.resolve(
      __dirname,
      `../databases/tenantsDB/${dbName}.sqlite`
    );
    const tenantSequelize = new Sequelize({
      dialect: "sqlite",
      storage: dbFilePath,
    });

    await tenantSequelize.query(
      `INSERT INTO users (name, email, password, is_primary) VALUES (?, ?, ?, ?)`,
      { replacements: [name, email, hashedPassword, true] }
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

    res.status(200).json(transportRequests);
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
      include: [
        {
          model: City,
          attributes: ["name"],
          include: [
            {
              model: State,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    if (!transportRequest) {
      return res.status(404).json({
        success: false,
        message: "Transport request not found",
      });
    }

    res.status(200).json({
      success: true,
      transportRequest: transportRequest,
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
