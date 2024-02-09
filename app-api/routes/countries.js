// Author: Joshua Flores
// Email: joshua.flores3@snhu.edu
// Date: 02/05/2024
// Version: 0.1.0
// Purpose: Sets the basic post and get using the countriesController for the api connecting to the database

const express = require("express");
const router = express.Router();
const countriesController = require("../controllers/countriesController");

router.get("/", countriesController.getCountries);

router.post("/", countriesController.addCountry);

module.exports = router;
