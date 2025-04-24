const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const asyncHandler = require("../middlewares/asyncHandler");
const { User, Admin } = require("../models/admin");
require("dotenv").config();

// Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).send({ message: "User not found!" });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid password!",
    });
  }

  const admin = await Admin.findOne({
    where: { user_id: user.id, status: true },
  });

  if (!admin) {
    return res.status(403).send({
      accessToken: null,
      message: "Access denied! You are not an admin.",
    });
  }

  const token = jwt.sign({ id: user.id.toString() }, config.secret, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: "24h", // 24 hours
  });

  res.status(200).send({
    user: {
      id: user.id,
      name: user.name,
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
