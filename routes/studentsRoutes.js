const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentsControllers");
const jwt = require("jsonwebtoken");


router.post("/save-student", authorize, studentController.saveStudent);
router.post("/edit-student", authorize, studentController.editStudent);
router.post("/delete-student", authorize, studentController.deleteStudent);
router.get("/get-all-students", studentController.getAllStudents);


function authorize( req, res, next) {

    try{

        let reqtoken = req.headers["authorization"];
        const token = reqtoken.replace("Bearer ", "");
        const verifiedToken = jwt.verify(token, "jamesBond");
        req.token = verifiedToken;
        next();
        return;

    }
    catch(error){

        res.send({message: "You are not authorized."})
    }
}


module.exports = router;
