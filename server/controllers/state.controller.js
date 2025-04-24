const asyncHandler = require("../middlewares/asyncHandler");
const { State } = require("../models/admin");

// Create a new state
const createState = asyncHandler(async (req, res) => {
  try {
    const { name, status } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "name is required" });
    }

    const newState = await State.create({ name, status });

    res.status(201).json({ success: true, state: newState });
  } catch (err) {
    console.error("Error creating State:", err);
    res.status(500).json({ success: false, message: "Failed to create state" });
  }
});

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

// Get State by ID
const getStateById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const state = await State.findByPk(id);
    if (!state) {
      return res
        .status(404)
        .json({ success: false, message: "state not found" });
    }

    res.status(200).json({ success: true, state });
  } catch (err) {
    console.error("Error fetching state:", err);
    res.status(500).json({ success: false, message: "Failed to fetch state" });
  }
});

// Update a state by id
const updateState = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const state = await State.findByPk(id);
    if (!state) {
      return res
        .status(404)
        .json({ success: false, message: "State not found" });
    }

    state.name = name || state.name;
    state.status = status !== undefined ? status : state.status;

    await state.save();

    res.status(200).json({ success: true, state });
  } catch (err) {
    console.error("Error updating state:", err);
    res.status(500).json({ success: false, message: "Failed to update state" });
  }
});

// Delete a state by ID
const deleteState = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const state = await State.findByPk(id);
    if (!state) {
      return res
        .status(404)
        .json({ success: false, message: "state not found" });
    }

    await state.destroy();

    res.status(200).json({
      success: true,
      message: "state deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting state:", err);
    res.status(500).json({ success: false, message: "Failed to delete state" });
  }
});

module.exports = {
  createState,
  getAllStates,
  getStateById,
  updateState,
  deleteState,
};
