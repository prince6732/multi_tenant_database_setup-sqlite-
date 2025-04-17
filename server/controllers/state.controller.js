const asyncHandler = require("../middlewares/asyncHandler");
const { State } = require("../models/admin");

const getAllStates = asyncHandler(async (req, res) => {
  try {
    const states = await State.findAll({
      order: [["name", "ASC"]],
      
    });

    res.status(200).json(states);
  } catch (err) {
    console.error("Error fetching states:", err);
    res.status(500).json({ success: false, message: "Failed to fetch states" });
  }
});

module.exports = { getAllStates };
