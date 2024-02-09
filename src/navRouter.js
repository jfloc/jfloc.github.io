// Author: Joshua Flores
// Email: joshua.flores3@snhu.edu
// Date: 02/05/2024
// Version: 0.1.0

/* code currently not being used in the current iteration */

const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  res.locals.activePage = req.originalUrl;
  next();
});

module.exports = router;
