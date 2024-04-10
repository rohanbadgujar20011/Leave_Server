const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Teacher = require("../Model/Teacher");

// Function to add a new teacher
async function addTeacher(req, res) {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    let existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Teacher instance
    const newTeacher = new Teacher({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new Teacher to the database
    await newTeacher.save();

    res.status(201).json({ message: "Teacher added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getAllTeachers(req, res) {
    try {
      const teachers = await Teacher.find().select('-password');
      // The '-password' argument to select() function tells MongoDB to exclude the password field
      res.status(200).json(teachers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  

// Function to retrieve a teacher by email
async function getTeacherByEmail(req, res) {
  const { email } = req.params;

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Function to retrieve a teacher by ID
async function getTeacherById(req, res) {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Function for teacher login
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If email and password are correct, generate a JWT token
    const token = jwt.sign(
      {
        teacherId: teacher._id,
        email: teacher.email,
        Role: teacher.Role,
        name: teacher.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send the token in the response
    res.status(200).json({
      token,
      Role: teacher.Role,
      name: teacher.name,
      email: teacher.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  addTeacher,
  getAllTeachers,
  getTeacherByEmail,
  getTeacherById,
  login,
};
