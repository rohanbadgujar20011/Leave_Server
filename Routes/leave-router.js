const express = require("express");
const leaverrouter = express.Router();
const {
  createLeave,
  getleavesbyemail,
} = require("../Controller/leave-controller");

leaverrouter.post("/createleave", createLeave);
leaverrouter.get("/getleavesbyemail/:id", getleavesbyemail);

module.exports = leaverrouter;
