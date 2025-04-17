const Router = require("express");
const citiesController = require("../controllers/cities.controller");
const citiesRouter = Router();

citiesRouter.get(
  "/api/states/:state_id/cities",
  citiesController.getCitiesByState
);

module.exports = citiesRouter;
