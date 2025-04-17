const sequelize = require("../../db");

const associateModels = require("./associations");
const Admin = require("./admins.model");
const SubscriptionType = require("./subscriptionsTypes.model");
const City = require("./cities.model");
const State = require("./states.model");
const Tenant = require("./tenants.model");
const User = require("./users.model");
const PasswordResetToken = require("./passwordResetTokens.model");
const Setting = require("./settings.model");
const Subscription = require("./subscriptions.model");
const TransportRequest = require("./transportRequests.model");
const LoadEntry = require("./loadEntries.model");
associateModels();

module.exports = {
  sequelize,
  User,
  Tenant,
  State,
  City,
  SubscriptionType,
  Admin,
  PasswordResetToken,
  Setting,
  Subscription,
  TransportRequest,
  LoadEntry,
};
