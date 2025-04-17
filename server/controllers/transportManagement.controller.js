const asyncHandler = require("../middlewares/asyncHandler");
const { State, Tenant, City } = require("../models/admin");
const { fn, col, literal } = require("sequelize");

const getActiveCities = asyncHandler(async (req, res) => {
  try {
    const states = await State.findAll({
      attributes: {
        include: [
          // Count of active tenants via cities
          [
            fn("COUNT", literal("DISTINCT `Cities->Tenants`.`id`")),
            "tenants_count",
          ],
        ],
      },
      include: [
        {
          model: City,
          attributes: [], // no need to return cities
          include: [
            {
              model: Tenant,
              attributes: [],
              where: { status: true }, // Only active tenants
              required: false,
            },
          ],
          required: false,
        },
      ],
      group: ["State.id"],
      order: [["name", "ASC"]],
    });

    res.status(200).json(states);
  } catch (err) {
    console.error("Error fetching states with tenant count:", err);
    res.status(500).json({ success: false, message: "Failed to fetch states" });
  }
});

const getCitiesTrasport = asyncHandler(async (req, res) => {
  try {
    const { state_id } = req.params;

    if (!state_id) {
      return res
        .status(400)
        .json({ success: false, message: "State ID is required" });
    }

    const cities = await City.findAll({
      where: { state_id },
      include: [
        {
          model: Tenant,
          required: true,
          attributes: [], // we only want count, not tenant fields
        },
      ],
      attributes: [
        "id",
        "name",
        [fn("COUNT", col("Tenants.id")), "tenantCount"],
      ],
      group: ["City.id"],
      order: [["name", "ASC"]],
    });

    const state = await State.findOne({
      where: { id: state_id },
      attributes: ["id", "name"],
    });

    res.status(200).json({
      cities,
      stateName: state ? state.name : "",
    });
  } catch (err) {
    console.error("Error fetching cities:", err);
    res.status(500).json({ success: false, message: "Failed to fetch cities" });
  }
});

module.exports = { getActiveCities, getCitiesTrasport };
