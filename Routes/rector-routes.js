const express = require("express");
const rectorrouter = express.Router();
const { signup, getallrectors } = require("../Controller/rector-controller");
const verifyToken = require("../middlewere/verifytoken");
rectorrouter.post("/signup", signup);
rectorrouter.get("/all", verifyToken, getallrectors);

module.exports = rectorrouter;
