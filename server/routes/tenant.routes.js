const Router = require("express");
const tenantController = require("../controllers/tenant.controller");
const tenantRouter = Router();

tenantRouter.post("/api/users/activate", tenantController.activateUser);

module.exports = tenantRouter;
