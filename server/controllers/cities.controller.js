const asyncHandler = require("../middlewares/asyncHandler");
const { State, City } = require("../models/admin");

const getCitiesByState = asyncHandler(async (req, res) => {
  try {
    const { state_id } = req.params;

    if (!state_id) {
      return res
        .status(400)
        .json({ success: false, message: "State ID is required" });
    }

    const cities = await City.findAll({
      where: {
        state_id: state_id,
      },
      order: [["name", "ASC"]],
    });

    const state = await State.findOne({
      where: {
        id: state_id,
      },
      attributes: ["id", "name"],
    });

    res
      .status(200)
      .json({ cities: cities, stateName: state ? state.name : "" });
  } catch (err) {
    console.error("Error fetching cities:", err);
    res.status(500).json({ success: false, message: "Failed to fetch cities" });
  }
});

module.exports = { getCitiesByState };
