const authController = require("../controllers/auth.controller");
const Router = require("express");
const authRouter = Router();

authRouter.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

//login route
authRouter.post("/api/auth/login", authController.login);

//logout route
authRouter.post("/api/auth/logout", authController.logout);

module.exports = authRouter;
