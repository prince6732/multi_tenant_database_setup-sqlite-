const Router = require("express");
const authRouter = require("./auth.routes");
const tenantRouter = require("./tenant.routes");

const router = Router();

router.use(authRouter);
router.use(tenantRouter);

module.exports = router;
