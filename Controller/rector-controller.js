const Rector = require("../Model/Rector");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    let existingRector = await Rector.findOne({ email });
    if (existingRector) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Teacher instance
    const newRector = new Rector({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new Teacher to the database
    await newRector.save();

    res.status(201).json({ message: "Rector added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json;
  }
}
async function getallrectors(req, res) {
  try {
    const rectors = await Rector.find().select("-password");

    res.status(200).json(rectors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  signup,
  getallrectors,
};
