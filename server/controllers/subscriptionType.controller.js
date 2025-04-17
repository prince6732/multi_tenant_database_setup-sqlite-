const asyncHandler = require("../middlewares/asyncHandler");
const { SubscriptionType } = require("../models/admin");

// Create a new subscription type
const createSubscriptionType = asyncHandler(async (req, res) => {
  try {
    const { name, price, duration, status } = req.body;

    // Validate input
    if (!name || !price || !duration) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newSubscription = await SubscriptionType.create({
      name,
      price,
      duration,
      status,
    });

    res.status(201).json({ success: true, subscription: newSubscription });
  } catch (err) {
    console.error("Error creating subscription type:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create subscription type" });
  }
});

// Get all subscription types
const getAllSubscriptionTypes = asyncHandler(async (req, res) => {
  try {
    const subscriptionTypes = await SubscriptionType.findAll();
    res.status(200).json({ success: true, subscriptionTypes });
  } catch (err) {
    console.error("Error fetching subscription types:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch subscription types" });
  }
});

// Get subscription type by ID
const getSubscriptionTypeById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const subscriptionType = await SubscriptionType.findByPk(id);
    if (!subscriptionType) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription type not found" });
    }

    res.status(200).json({ success: true, subscriptionType });
  } catch (err) {
    console.error("Error fetching subscription type:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch subscription type" });
  }
});

// Update a subscription type by ID
const updateSubscriptionType = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, duration, status } = req.body;

    const subscriptionType = await SubscriptionType.findByPk(id);
    if (!subscriptionType) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription type not found" });
    }

    subscriptionType.name = name || subscriptionType.name;
    subscriptionType.price = price || subscriptionType.price;
    subscriptionType.duration = duration || subscriptionType.duration;
    subscriptionType.status =
      status !== undefined ? status : subscriptionType.status;

    await subscriptionType.save();

    res.status(200).json({ success: true, subscriptionType });
  } catch (err) {
    console.error("Error updating subscription type:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to update subscription type" });
  }
});

// Delete a subscription type by ID
const deleteSubscriptionType = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const subscriptionType = await SubscriptionType.findByPk(id);
    if (!subscriptionType) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription type not found" });
    }

    await subscriptionType.destroy();

    res
      .status(200)
      .json({
        success: true,
        message: "Subscription type deleted successfully",
      });
  } catch (err) {
    console.error("Error deleting subscription type:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete subscription type" });
  }
});

module.exports = {
  createSubscriptionType,
  getAllSubscriptionTypes,
  getSubscriptionTypeById,
  updateSubscriptionType,
  deleteSubscriptionType,
};
