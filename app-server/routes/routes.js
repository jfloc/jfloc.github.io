// Author: Joshua Flores
// Purpose: Serve the front-end page client side

const express = require("express");
const router = express.Router();
const countryController = require("../controllers/countryController");

router.get("/", (req, res) => {
  res.render("home");
});

// Handle the "/packages" path - Render the "packages" template and call function from the countryController to load data
router.get("/packages", countryController.renderPage);

router.get("/news", countryController.renderPage);

router.get("/support", (req, res) => {
  res.render("support");
});

module.exports = router;
