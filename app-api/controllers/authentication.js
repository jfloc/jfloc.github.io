// This ensures the authentication is setup to work for users in the database
const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    await user.setPassword(req.body.password);
    await user.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Failed to register user" });
  }
};
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      return res.status(404).json(err);
    }
    if (user) {
      const token = user.generateJwt();
      console.log("This is the login generateJwt code");
      res.status(200).json({ token });
    } else {
      console.log("This is the login generateJwt code else statement");
      res.status(401).json(info);
    }
  })(req, res);
};
module.exports = {
  register,
  login,
};
