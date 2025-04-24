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

// CREATE a new city
const createCity = asyncHandler(async (req, res) => {
  const { name, pincode, status } = req.body;
  const { state_id } = req.params;

  if (!name || !state_id) {
    return res
      .status(400)
      .json({ success: false, message: "Name and State ID are required" });
  }

  const newCity = await City.create({ name, state_id, pincode, status });
  res.status(201).json({ success: true, city: newCity });
});

// UPDATE a city
const updateCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, pincode, status } = req.body;

  const city = await City.findByPk(id);
  if (!city) {
    return res.status(404).json({ success: false, message: "City not found" });
  }

  city.name = name || city.name;
  city.pincode = pincode || city.pincode;
  city.status = status !== undefined ? status : city.status;

  await city.save();
  res.status(200).json({ success: true, city });
});

// DELETE a city
const deleteCity = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const city = await City.findByPk(id);
  if (!city) {
    return res.status(404).json({ success: false, message: "City not found" });
  }

  await city.destroy();
  res.status(200).json({ success: true, message: "City deleted successfully" });
});

module.exports = {
  getCitiesByState,
  createCity,
  updateCity,
  deleteCity,
};
