// Author: Joshua Flores
// Email: joshua.flores3@snhu.edu
// Date: 02/05/2024
// Version: 0.1.0
// Purpose: Sets the basic post and get using the countriesController for the api connecting to the database
// Allows for update of data as well as post and get

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { expressjwt: jwt } = require("express-jwt");
const countriesController = require("../controllers/countriesController");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  requestProperty: "payload",
  algorithms: ["HS256"],
});

const authController = require("../controllers/authentication");
//Creates the storage for the files
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/uploads/"); // Files will be saved in the public/uploads/ directory
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage });

// Setting the routes for the api

router.route("/login").post(authController.login);
router.route("/register").post(authController.register);

router
  .route("/country")
  .get(countriesController.getCountries)
  .post(auth, upload.single("image"), countriesController.addCountry);

//update with authorization
router
  .route("/country/:id")
  .put(auth, upload.single("image"), countriesController.updateCountry);

module.exports = router;
