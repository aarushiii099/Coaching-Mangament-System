const express = require("express");
const router = express.Router();

const attendanceController = require("../controllers/attendanceControllers");
const jwt = require("jsonwebtoken");


router.get("/get-attendance", attendanceController.getAttendance);
router.post("/update-attendance", authorize, attendanceController.saveAttendanceStatus);
router.post("/get-attendance-metrics", attendanceController.getDashBoardMetrics)
router.post("/get-monthly-attendance", attendanceController.getMonthlyAttendanceSummary)


function authorize (req, res, next) {

    try{

        let reqtoken = req.headers["authorization"];
        const token = reqtoken.replace("Bearer ", "");
        const verifiedToken = jwt.verify(token, "jamesBond")

    }

    catch(error){
        res.send({message: "You are not authorized."})
    }
}

module.exports = router;