const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  res.locals.activePage = req.originalUrl;
  next();
});

module.exports = router;
