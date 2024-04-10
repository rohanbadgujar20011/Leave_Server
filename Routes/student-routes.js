const express = require("express");
const studentrouter = express.Router();
const { signup, login } = require("../Controller/student-controller");
const verifyToken = require("../middlewere/verifytoken");
// Route for user signup
studentrouter.post("/signup", signup);

// Route for user login
studentrouter.post("/login", login);
studentrouter.get("/protected", verifyToken, (req, res) => {
  // Access the user's information from req.user
  res.json({ message: "Access granted", user: req.user });
});
module.exports = studentrouter;
