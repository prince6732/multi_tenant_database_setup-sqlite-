const Router = require("express");
const subscriptionTypeController = require("../controllers/subscriptionType.controller");
const subscriptionTypeRouter = Router();

subscriptionTypeRouter
  .route("/api/subscription-types")
  .post(subscriptionTypeController.createSubscriptionType)
  .get(subscriptionTypeController.getAllSubscriptionTypes);

subscriptionTypeRouter
  .route("/api/subscription-types/:id")
  .get(subscriptionTypeController.getSubscriptionTypeById)
  .put(subscriptionTypeController.updateSubscriptionType)
  .delete(subscriptionTypeController.deleteSubscriptionType);

module.exports = subscriptionTypeRouter;
