// Author: Joshua Flores
// Email: joshua.flores3@snhu.edu
// Date: 02/05/2024
// Version: 0.1.0
// Purpose: Sets up the schema for the databases current data

const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

/* Running a pre hook before saving to ensure in cases of concurrent saves into data or direct access of data through the mongosh that the country is actually unique */
countrySchema.pre("save", async function (next) {
  const existingCountry = await this.constructor.findOne({ name: this.name });
  console.log(existingCountry);
  if (existingCountry) {
    return next(new Error("Country already exists"));
  } else {
    return next();
  }
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
