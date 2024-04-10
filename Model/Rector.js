const mongoose = require("mongoose");

const rectorschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  Role: {
    type: String,
    default: "rector",
    
  },
});
const Rector = mongoose.model("Rector", rectorschema);
module.exports = Rector;
