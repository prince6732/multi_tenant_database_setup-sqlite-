// models/index.js
const State = require("./state.model");
const City = require("./city.model");

State.hasMany(City, { foreignKey: "state_id" });
City.belongsTo(State, { foreignKey: "state_id" });

module.exports = { State, City };
