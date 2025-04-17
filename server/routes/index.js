const Router = require("express");
const authRouter = require("./auth.routes");
const citiesRouter = require("./cities.routes");
const stateRouter = require("./state.routes");
const subscriptionTypeRouter = require("./subscriptionType.routes");
const tenantRouter = require("./tenant.routes");
const transportRouter = require("./transport.routes");
const transportManagementRouter = require("./transportManagement.routes");
const userRouter = require("./user.routes");

const router = Router();

router.use(authRouter);
router.use(citiesRouter);
router.use(stateRouter);
router.use(subscriptionTypeRouter);
router.use(tenantRouter);
router.use(transportRouter);
router.use(transportManagementRouter);
router.use(userRouter);

module.exports = router;
