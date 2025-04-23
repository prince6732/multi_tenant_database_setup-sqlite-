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

transportRouter.get(
  "/api/transport-requests/:request_id",
  transportController.getTransportRequestById
);

module.exports = transportRouter;
