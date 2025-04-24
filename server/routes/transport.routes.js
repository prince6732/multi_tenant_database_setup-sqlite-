const Router = require("express");
const transportController = require("../controllers/transport.controller");
const transportRouter = Router();

transportRouter.post(
  "/api/create-transport/:request_id",
  transportController.createTransport
);

transportRouter.get(
  "/api/transport-requests/fresh",
  transportController.getFreshTransportRequests
);

transportRouter
  .route("/api/transport-requests/:request_id")
  .get(transportController.getTransportRequestById)
  .delete(transportController.deleteTransportRequest);

module.exports = transportRouter;
