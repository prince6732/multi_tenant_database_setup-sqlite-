const Router = require("express");
const stateController = require("../controllers/state.controller");
const stateRouter = Router();

stateRouter
  .route("/api/states")
  .post(stateController.createState)
  .get(stateController.getAllStates);

stateRouter
  .route("/api/states/:id")
  .get(stateController.getStateById)
  .put(stateController.updateState)
  .delete(stateController.deleteState);

module.exports = stateRouter;
