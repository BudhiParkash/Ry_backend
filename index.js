const express = require("express");
require("dotenv").config();
require("./db/dbconnection");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize Express app
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

// app.use((req, res, next) => {
//   const acceptHeader = req.headers.accept || "";

//   // Check if the request does not accept JSON
//   if (!acceptHeader.includes("application/json")) {
//     return res.status(406).send("Not Acceptable");
//   }

//   next();
// });

//News Router
const teacherRouter = require("./routes/teacher");
const authrouter = require("./routes/authRoutes");
const studentRouter = require("./routes/studentRoutes");

app.use(teacherRouter);
app.use(authrouter);
app.use(studentRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
