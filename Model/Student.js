const mongoose = require("mongoose");

// Define the schema for Student
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  requests: [
    {
      type: String, // Assuming this is an array of strings representing requests
    },
  ],
  year: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
  },
  isvalid: {
    type: Boolean,
    default: false,
  },
  Role: {
    type: String,
    default: "student",
  },
});

// Create and export the Student model
module.exports = mongoose.model("Student", studentSchema);
