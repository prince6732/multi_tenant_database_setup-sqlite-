const { Tenant } = require("../models/admin");
const asyncHandler = require("../middlewares/asyncHandler");

const getTenantsByCity = asyncHandler(async (req, res) => {
  try {
    const { city_id } = req.params;

    if (!city_id) {
      return res
        .status(400)
        .json({ success: false, message: "City ID is required" });
    }

    const tenants = await Tenant.findAll({
      where: { city_id },
      order: [["name", "ASC"]],
    });

    res.status(200).json({
      success: true,
      tenants,
    });
  } catch (err) {
    console.error("Error fetching tenants by city:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch tenants" });
  }
});

module.exports = { getTenantsByCity };
