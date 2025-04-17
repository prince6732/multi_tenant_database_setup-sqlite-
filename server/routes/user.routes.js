const Router = require("express");
const userController = require("../controllers/users.controller");
const userRouter = Router();

userRouter
  .route("/api/users")
  .get(userController.getAllUsers) // get all users
  .post(userController.createUser); // create users

userRouter
  .route("/api/users/:id")
  .get(userController.getUserById) // get user by id
  .put(userController.updateUser) // update user
  .delete(userController.deleteUser); // delete user

module.exports = userRouter;
