const axios = require("axios");
const dotenv = require("dotenv");
const Student = require("../models/student")

dotenv.config();

const saveStudent = async (req, res) => {

    try{
        console.log("reqToken", req.token)
        let payload = req.body;
        console.log(payload)
        const name = payload.name;
        const batchId = payload.batchId;
        const email = payload.email;

        const newStudent = new Student(payload);
        const savedNewStudent = await newStudent.save()

        res.status(200).send(savedNewStudent);
    }
    catch(error){
        res.status(400).send({error: error.message, stack: error.stack})
    }

};

const editStudent = async (req, res) =>{

    try{

    const payload = req.body;
    const studentId = req.query.studentId;

    const updateField = {

        email: payload.email,
        batchId: payload.batchId

    }

    const updatedStudentData = await Student.findByIdAndUpdate(studentId, updateField, {new: true});

    res.status(200).send(updatedStudentData);

    }
    
    catch(error){
        res.status(400).send({error: error.message, stack: error.stack})
    }

}

const deleteStudent = async (req, res) => {

    try{

    const studentId = req.query.studentId;

    const updatedData = await Student.findByIdAndUpdate({ _id: studentId}, {isDeleted: true}, {new: true});
    res.status(200).send(updatedData);

    }
    catch(error){
        res.status(400).send({error: error.message, stack: error.stack})
    }

}

const getAllStudents = async (req, res) =>{

    try{
        const studentData = await Student.find({isDeleted: false})
        res.status(200).send(studentData)
    }
    catch(error){
        res.status(400).send({error: error.message, stack: error.stack})
    }
    
}


module.exports = {
    saveStudent,
    editStudent,
    deleteStudent,
    getAllStudents
    
}