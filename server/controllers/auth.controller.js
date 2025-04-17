const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const prisma = require("../prisma/prismaClient/prismaClient");
const asyncHandler = require("../middlewares/asyncHandler");
const { User } = require("../models/admin");
require("dotenv").config();

// Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).send({ message: "User not found!" });
  }

  // Validate password
  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid password!",
    });
  }

  // Generate JWT
  const token = jwt.sign({ id: user.id.toString() }, config.secret, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: "24h", // 24 hours
  });

  res.status(200).send({
    user: {
      // id: user.id,
      // username: user.name,
      email: user.email,
    },
    accessToken: token,
  });
});

//log out
const logout = asyncHandler(async (req, res) => {
  req.session = null;
  return res.status(200).send({
    message: "You've been signed out!",
  });
});

module.exports = {
  login,
  logout,
};
