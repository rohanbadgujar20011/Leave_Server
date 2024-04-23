const Student = require("../Model/Student");
const Leave = require("../Model/Leave");
// controllers/authController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Function for user signup
async function signup(req, res) {
  const { name, email, password, year, department } = req.body;

  try {
    // Check if the email is already registered
    // let existingStudent = await Student.findOne({ email });
    // if (existingStudent) {
    //   return res.status(400).json({ message: "Email already exists" });
    // }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Student instance
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      year,
      department,
    });

    // Save the new Student to the database
    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Function for user login
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const leaves = await Leave.find({ email });
    // If email and password are correct, generate a JWT token
    const token = jwt.sign(
      {
        studentId: student._id,
        email: student.email,
        Role: student.Role,
        name: student.name,
        year: student.year,
        department: student.department,
        teacher: student.teacher,
        isvalid: student.isvalid,
        requests: student.requests,
        leaves,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const user = {
      studentId: student._id,
      email: student.email,
      Role: student.Role,
      name: student.name,
      year: student.year,
      department: student.department,
      teacher: student.teacher,
      isvalid: student.isvalid,
      requests: student.requests,
    };

    // Send the token in the response
    res.status(200).json({ token, Role: student.Role, user, leaves });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  signup,
  login,
};
