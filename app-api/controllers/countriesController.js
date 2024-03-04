// Author: Joshua Flores
// Email: joshua.flores3@snhu.edu
// Date: 02/05/2024
// Version: 0.1.0
// Purpose: Controller for the routes for get and post http protocols connecting to the database travlr_db
const mongoose = require("mongoose");
const Country = mongoose.model("Country");
const User = mongoose.model("users");
const crypto = require("crypto");

const getUser = async (req, res, callback) => {
  try {
    //console.log("Request payload:", req.payload);
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
/////////////////////////////////////////////////////////////
// second half will generate random 0-9 string of length 3//
///////////////////////////////////////////////////////////

const generateRandomString = () => {
  let randomString = "";
  const intDigitList = "0123456789";
  randomString = addToString(intDigitList, randomString);
  return randomString;
};

const addToString = (charset, stringIn) => {
  let randomString = "";
  const values = new Uint32Array(3);
  let randvalues = crypto.randomFillSync(values);
  console.log("randvalues are", randvalues);
  console.log("values are", values);
  for (let i = 0; i < 3; i++) {
    let valueCalced = values[i] % charset.length;
    console.log(valueCalced);
    randomString += charset[values[i] % charset.length];
  }
  stringIn += randomString;
  console.log("console.log is", stringIn);
  return stringIn;
};

/* Adds a country to the current database with established connection */
const addCountry = async (req, res) => {
  console.log("addCountry called");
  try {
    // Check if image file was uploaded
    // console.log("req payload is", req.payload);

    getUser(req, res, async (req, res) => {
      if (!req.file) {
        return res.status(400).json({ error: "Image file is required" });
      }

      // Process the image file
      const imageUrl = req.file.path.replace("public\\", ""); // Gets the path of the uploaded image file and removes public to ensure correct pathcall
      const randomGenerateString = generateRandomString();
      const country = new Country({
        code: req.body.code,
        name: req.body.name + randomGenerateString,
        imageUrl: imageUrl,
      });
      console.log("random string in addCountry is ", randomGenerateString);
      console.log("country image url is", country.imageUrl);
      try {
        const savedCountry = await country.save();
        return res.status(201).json(savedCountry);
      } catch (error) {
        if (
          error.code === 11000 ||
          error.message.includes("duplicate key error")
        ) {
          console.log("eror was thrown buddy", error.code);
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

const updateCountry = async (req, res) => {
  console.log("updateCountry called");
  getUser(req, res, async (req, res) => {
    let reqId = req.body;
    console.log("req.body is ", req.body);
    if (req.file && req.file.path) {
      imageUrl = req.file.path.replace("public\\", "");
    }
    console.log("updateCountry image url is", imageUrl);

    //this below ensures that the country being updated is the existing one
    try {
      const existingCountry = await Country.findOne({ code: req.body.code });
      if (!existingCountry) {
        return res.status(404).json({ error: "Country not found" });
      } else {
        console.log("Country found", existingCountry);
      }

      let updatedFields = {
        code: existingCountry.code || req.body.code,
        name:
          existingCountry.name.slice(0, -3) == req.body.name
            ? existingCountry.name
            : req.body.name,
        imageUrl: imageUrl || existingCountry.imageUrl,
      };

      console.log("req.body is", req.body);
      const updatedCountry = await Country.findByIdAndUpdate(
        req.body._id,
        updatedFields,
        { new: true }
      );

      console.log("updated country is", updatedCountry);

      res.json(updatedCountry);
    } catch (error) {
      console.error("Error updating country:", error);
      res.status(500).json({ error: "Failed to update country" });
    }
  });
};

module.exports = {
  getCountries,
  addCountry,
  updateCountry,
};
