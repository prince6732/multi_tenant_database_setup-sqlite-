const Admin = require("./admins.model");
const City = require("./cities.model");
const LoadEntry = require("./loadEntries.model");
const State = require("./states.model");
const Subscription = require("./subscriptions.model");
const SubscriptionType = require("./subscriptionsTypes.model");
const Tenant = require("./tenants.model");
const TransportRequest = require("./transportRequests.model");
const User = require("./users.model");

User.belongsTo(Tenant, { foreignKey: "tenant_id", onDelete: "RESTRICT" });
Tenant.hasMany(User, { foreignKey: "tenant_id" });

// City <-> State
City.belongsTo(State, { foreignKey: "state_id", onDelete: "RESTRICT" });
State.hasMany(City, { foreignKey: "state_id" });

// Tenant <-> City
Tenant.belongsTo(City, { foreignKey: "city_id", onDelete: "RESTRICT" });
City.hasMany(Tenant, { foreignKey: "city_id" });

// Tenant <-> SubscriptionType
Tenant.belongsTo(SubscriptionType, {
  foreignKey: "subscription_type_id",
  onDelete: "RESTRICT",
});
SubscriptionType.hasMany(Tenant, { foreignKey: "subscription_type_id" });

// Subscription <-> Tenant
Subscription.belongsTo(Tenant, {
  foreignKey: "tenant_id",
  onDelete: "RESTRICT",
});
Tenant.hasMany(Subscription, { foreignKey: "tenant_id" });

// Subscription <-> User
Subscription.belongsTo(User, { foreignKey: "user_id", onDelete: "RESTRICT" });
User.hasMany(Subscription, { foreignKey: "user_id" });

// Subscription <-> SubscriptionType
Subscription.belongsTo(SubscriptionType, {
  foreignKey: "subscription_type_id",
  onDelete: "RESTRICT",
});
SubscriptionType.hasMany(Subscription, { foreignKey: "subscription_type_id" });

// Admin <-> User (One-to-One Relationship)
User.hasOne(Admin, { foreignKey: "user_id" }); // One user can have one admin
Admin.belongsTo(User, { foreignKey: "user_id", onDelete: "RESTRICT" });

TransportRequest.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "RESTRICT",
});
User.hasMany(TransportRequest, { foreignKey: "user_id" });

// --- TransportRequest <-> City ---
TransportRequest.belongsTo(City, {
  foreignKey: "city_id",
  onDelete: "RESTRICT",
});
City.hasMany(TransportRequest, { foreignKey: "city_id" });

LoadEntry.belongsTo(User, { foreignKey: "user_id", onDelete: "RESTRICT" });
User.hasMany(LoadEntry, { foreignKey: "user_id" });

// --- LoadEntry <-> City ---
LoadEntry.belongsTo(City, { foreignKey: "city_id", onDelete: "RESTRICT" });
City.hasMany(LoadEntry, { foreignKey: "city_id" });

module.exports = function associateModels() {};
