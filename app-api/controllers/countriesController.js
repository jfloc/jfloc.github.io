// Author: Joshua Flores
// Email: joshua.flores3@snhu.edu
// Date: 02/05/2024
// Version: 0.1.0
// Purpose: Controller for the routes for get and post http protocols connecting to the database travlr_db

const Country = require("../models/country");

/* Exports the getCountries function to the file that will use it*/
exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/* Adds a country to the current database with established connection */
exports.addCountry = async (req, res) => {
  try {
    const { name } = req.body;
    const newCountry = new Country({ name });
    const savedCountry = await newCountry.save();
    res.status(201).json(savedCountry);
  } catch (error) {
    if (error.code === 11000 || error.message.includes("duplicate key error")) {
      res.status(400).json({ error: "Country already exists" });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
