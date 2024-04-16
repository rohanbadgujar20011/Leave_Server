const express = require("express");
const leaverrouter = express.Router();
const verifyToken = require("../middlewere/verifytoken");
const {
  createLeave,
  getleavesbyemail,
} = require("../Controller/leave-controller");

leaverrouter.post("/createleave", verifyToken, createLeave);
leaverrouter.get("/getleavesbyemail/:id", getleavesbyemail);

module.exports = leaverrouter;
