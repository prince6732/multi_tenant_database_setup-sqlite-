const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const asyncHandler = require("./asyncHandler");
const { User } = require("../models/admin");

const verifyToken = asyncHandler(async (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(403).send({
      message: "Invalid token format.",
    });
  }

  token = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;

    // Fetch user using Sequelize
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(401).send({ message: "User not found!" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).send({
      message: "Unauthorized!",
    });
  }
});

module.exports = {
  verifyToken,
};
