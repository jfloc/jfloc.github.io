const express = require("express");
const router = express.Router();
const countriesController = require("../controllers/countriesController");

router.get("/", countriesController.getCountries);

router.post("/", countriesController.addCountry);

module.exports = router;
