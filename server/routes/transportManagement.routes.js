const Router = require("express");
const transportManagementController = require("../controllers/transportManagement.controller");
const transportManagementRouter = Router();

transportManagementRouter.get(
  "/api/transport/states",
  transportManagementController.getActiveCities
);

transportManagementRouter.get(
  "/api/transport/:state_id/cities",
  transportManagementController.getCitiesTrasport
);

module.exports = transportManagementRouter;
