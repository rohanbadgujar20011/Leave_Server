const express = require("express");
const teacherRouter = express.Router();

const {
  addTeacher,
  getAllTeachers,
  getTeacherByEmail,
  getTeacherById,
  login,
  getallleaves,
  approveleavebyteacher,
} = require("../Controller/teacher-controller");
const verifyToken = require("../middlewere/verifytoken");

// Route to add a new teacher
teacherRouter.post("/signup", addTeacher);

// Route for teacher login
teacherRouter.post("/login", login);

// Protected route to retrieve all teachers
teacherRouter.get("/all", verifyToken, getAllTeachers);

// Protected route to retrieve a teacher by email
teacherRouter.get("/email/:email", verifyToken, getTeacherByEmail);

// Protected route to retrieve a teacher by ID
teacherRouter.get("/:id", verifyToken, getTeacherById);
teacherRouter.get("/getallleaves/:id", verifyToken, getallleaves);
teacherRouter.patch(
  "/approveleavebyteacher",
  verifyToken,
  approveleavebyteacher
);

module.exports = teacherRouter;
