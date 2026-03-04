const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const JWT_SECRET = process.env.JWT_SECRET;
const studentRoutes = require("./routes/studentsRoutes.js");
const attendanceRoutes = require("./routes/attendanceRoutes.js");
const userRoutes = require("./routes/userRoutes.js");


dotenv.config(); 
const port = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose
  .connect("mongodb://127.0.0.1:27017/project1")
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // stop server if DB fails
  });


app.use("/students", studentRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/user", userRoutes);


app.get("/", (req, res) => {
  res.send("API is running");
});


app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})