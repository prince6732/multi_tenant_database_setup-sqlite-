const Router = require("express");
const citiesController = require("../controllers/cities.controller");
const citiesRouter = Router();

citiesRouter
  .route("/api/cities/:state_id")
  .get(citiesController.getCitiesByState)
  .post(citiesController.createCity);

// citiesRouter.post("/api/cities", citiesController.createCity);
// citiesRouter.get("/api/cities", citiesController.getCities);

// citiesRouter.get("/api/cities/:id", citiesController.getCityById);
// citiesRouter.put("/api/cities/:id", citiesController.updateCity);
// citiesRouter.delete("/api/cities/:id", citiesController.deleteCity);

citiesRouter
  .route("/api/cities/:id")
  .put(citiesController.updateCity)
  .delete(citiesController.deleteCity);

module.exports = citiesRouter;
