const mongoose = require("mongoose");

// Define the schema for Leave
const leaveSchema = new mongoose.Schema({
  leaveID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  assignedTeacher: {
    type: String,
    default: "P.K.Sinha",
  },
  assignedRector: {
    type: String,
    default: "H.E.Survavanshi",
  },

  statusI: {
    type: Boolean,
    default: false,
  },
  statusII: {
    type: Boolean,
    default: false,
  },
  isRejected: {
    type: Boolean,
    default: false,
  },
  Comment: {
    type: String,
    trim: true,
    default: null,
  },
});

// Create and export the Leave model
module.exports = mongoose.model("Leave", leaveSchema);
