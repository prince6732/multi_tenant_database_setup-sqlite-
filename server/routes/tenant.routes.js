const Router = require("express");
const tenantController = require("../controllers/tenant.controller");
const tenantRouter = Router();

tenantRouter.get("/api/tenants/:city_id", tenantController.getTenantsByCity);

module.exports = tenantRouter;
