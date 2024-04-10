const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  Role: {
    type: String,
    default: 'teacher',
    enum: ['teacher', 'admin'] // Example roles, you can adjust as needed
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
