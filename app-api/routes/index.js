// Author: Joshua Flores
// Email: joshua.flores3@snhu.edu
// Date: 02/05/2024
// Version: 0.1.0
// Purpose: Sets the basic post and get using the countriesController for the api connecting to the database

const express = require("express");
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt");
const countriesController = require("../controllers/countriesController");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  requestProperty: "payload",
  algorithms: ["HS256"],
});

const authController = require("../controllers/authentication");

router.route("/login").post(authController.login);
router.route("/register").post(authController.register);

router
  .route("/country")
  .get(countriesController.getCountries)
  .post(auth, countriesController.addCountry);

module.exports = router;
