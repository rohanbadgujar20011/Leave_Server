const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const socket = require("socket.io");
app.use(cors());
app.use(express.json());
const DbConnection = require("./DbConnection");
const port = process.env.PORT || 8001;
const studentrouter = require("./Routes/student-routes");
const leaverrouter = require("./Routes/leave-router");
const teacherRouter = require("./Routes/teacher-routes");
const rectorRouter = require("./Routes/rector-routes");
const server = app.listen(port, () => {
  DbConnection();
  console.log(`Example app listening on port ${port}`);
});
// const io = socket(server, {
//   cors: {
//     origin: `${process.env.CLIENT}`,
//     credentials: true,
//   },
// });
// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   console.log("Its connection");
//   global.leavetrasformspcket = socket;
//   socket.on("add", () => {
//     console.log("chala karuya start");
//   });
// });
app.use("/student", studentrouter);
app.use("/leave", leaverrouter);
app.use("/teacher", teacherRouter);
app.use("/rector", rectorRouter);
