const asyncHandler = require("../middlewares/asyncHandler");
const bcrypt = require("bcryptjs");
const { User } = require("../models/admin");

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

// Get user by ID
const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

// Create new user
const createUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    provider,
    provider_id,
    is_primary,
    verification_code,
    status,
    tenant_id,
    remember_token,
  } = req.body;

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    provider,
    provider_id,
    is_primary,
    verification_code,
    status,
    tenant_id,
    remember_token,
  });

  res.status(201).json(newUser);
});

// Update user by ID
const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const updateData = { ...req.body };

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  await user.update(updateData);

  res.status(200).json({ message: "User updated", user });
});

// Delete user by ID
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.destroy();
  res.status(200).json({ message: "User deleted successfully" });
});

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
