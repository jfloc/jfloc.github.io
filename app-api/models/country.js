// Author: Joshua Flores
// Email: joshua.flores3@snhu.edu
// Date: 02/05/2024
// Version: 0.1.0
// Purpose: Sets up the schema for the databases current data

const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
});

/* Running a pre hook before saving to ensure in cases of concurrent saves into data or direct access of data through the mongosh that the country is actually unique */
countrySchema.pre("save", async function (next) {
  const existingCountry = await this.constructor.findOne({ name: this.name });

  if (existingCountry) {
    const err = new Error("Country already exists");
    next(err);
  } else {
    next();
  }
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
