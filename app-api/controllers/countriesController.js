const Country = require("../models/country");

exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
