const Router = require("express");
const authRouter = require("./auth.routes");
const tenantRouter = require("./tenant.routes");
const userRouter = require("./user.routes");
const stateRouter = require("./state.routes");
const citiesRouter = require("./cities.routes");
const transportManagementRouter = require("./transportManagement.routes");

const router = Router();

router.use(authRouter);
router.use(tenantRouter);
router.use(userRouter);
router.use(stateRouter);
router.use(citiesRouter);
router.use(transportManagementRouter);

module.exports = router;
