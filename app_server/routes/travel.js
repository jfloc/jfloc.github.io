// Author: Joshua Flores
// Purpose: Serve the front-end page client side

const express = require("express");
const router = express.Router();
const controller = require("../controllers/travel");

router.get("/", controller.travelList);

module.exports = router;
