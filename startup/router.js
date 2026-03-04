const express = require("express");
const studentRoutes = require("../routes/studentsRoutes")
const attendanceRoutes = require("../routes/attendanceRoutes");
const mongoose = require("mongoose");



module.exports = function(app) {
    app.use(express.json());
    mongoose.connect("mongodb://127.0.0.1:27017/project1");
    app.use("/api/students", studentRoutes);
    app.use("/api/attendance", attendanceRoutes);
}
