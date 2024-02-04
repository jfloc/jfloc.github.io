const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
});

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
