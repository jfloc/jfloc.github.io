// Author: Joshua Flores
// Email: joshua.flores3@snhu.edu
// Date: 02/05/2024
// Version: 0.1.0
// Purpose: Controller for the routes for get and post http protocols connecting to the database travlr_db
const mongoose = require("mongoose");
const Country = mongoose.model("Country");
const User = mongoose.model("users");

const getUser = async (req, res, callback) => {
  try {
    console.log("Request payload:", req.payload);
    if (req.payload && req.payload.email) {
      const user = await User.findOne({ email: req.payload.email }).exec();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      callback(req, res, user.name); // Call the callback function with the user data
    } else {
      return res.status(400).json({ message: "Invalid payload" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/* Exports the getCountries function to the file that will use it*/
const getCountries = async (req, res) => {
  try {
    const countries = await Country.find({}).exec();
    if (countries.length === 0) {
      return res.status(404).json({ message: "Countries not found" });
    }
    return res.status(200).json(countries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Adds a country to the current database with established connection */
const addCountry = async (req, res) => {
  try {
    console.log("req payload is", req.payload);

    getUser(req, res, async (req, res) => {
      const country = new Country({
        code: req.body.code,
        name: req.body.name,
      });

      try {
        const savedCountry = country.save();
        return res.status(201).json(savedCountry);
      } catch (error) {
        if (
          error.code === 11000 ||
          error.message.includes("duplicate key error")
        ) {
          return res.status(400).json({ error: "Country already exists" });
        } else {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getCountries,
  addCountry,
};
