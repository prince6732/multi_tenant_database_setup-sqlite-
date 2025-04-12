const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const prisma = require("../prisma/prismaClient/prismaClient");
const asyncHandler = require("../middlewares/asyncHandler");
require("dotenv").config();

//log in
const login = asyncHandler(async (req, res) => {
  const user = await prisma.users.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.status(404).send({ message: "user not found!" });
  }

  var passwordIsValid = await bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "invalid password!",
    });
  }

  const token = jwt.sign({ id: user.id.toString() }, config.secret, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: "24h", // 24 hours
  });

  res.status(200).send({
    user: {
      username: user.username,
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
