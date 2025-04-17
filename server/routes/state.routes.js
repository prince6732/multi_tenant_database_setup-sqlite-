const Router = require("express");
const stateController = require("../controllers/state.controller");
const stateRouter = Router();

stateRouter.get("/api/states", stateController.getAllStates);

module.exports = stateRouter;
