const Attendance = require("../models/attendance");
const Student = require("../models/student")

const getAttendance = async (req, res) => {

    try{

     const date = req.body.date;
     const todaysDate = new Date(date);
     console.log("todaysDate", todaysDate)
     const batchId = req.body.batchId;

     const data = await Attendance.find({date: todaysDate, batchId: batchId}).select(["name", "status", "batchId", "date", "studentId"]);//FIND RETURNS EMPTY ARRAY IF FINDS NOTHING//FINDBYID returns null
    //  console.log("data", data)

     if(data.length > 0){

        res.status(200).send(data);

     }
     else{
        const students = await Student.find({batchId: batchId, isDeleted: false});
        // console.log("students", students)
        const attendance = await Promise.all(students.map(async (d) =>{

        let newAttendance = {

            studentId: d._id,
            name: d.name,
            status: d.status,
            date: todaysDate, 
            batchId: batchId
        }

        const newStudentAttendance = new Attendance(newAttendance);
        const savedNewStudentAttendance = await newStudentAttendance.save();

        return newAttendance;


       }))

       res.status(200).send(attendance);

     }

    }
    catch(error){
        res.status(400).send({error: error.message, stack: error.stack})
    }
}

const saveAttendanceStatus = async(req, res) => {

    try{

        const studentIds = req.body.studentIds;
        console.log("studentIds", studentIds)
        const date = req.body.date;
        const todaysDate = new Date(date);
 

        const updatedAttendances = await Promise.all(studentIds.map(async (d) => {
            console.log("d", d)

            let updatedStudent = await Attendance.updateOne({studentId: d, date: todaysDate}, {status: true});
            return updatedStudent;
        }));

        res.status(200).send("Attendances updated successfully!")

    }
    catch(error){
        res.status(400).send({error: error.message, stack: error.stack})
    }
}


const getDashBoardMetrics = async(req, res) => {

    try{

        const flag = req.query.flag;//flag=0 for all studentData//flag=1 for batch1 studentData//flag=2 for batch2 studentData and so on
        const date = req.body.date;
        const todaysDate = new Date(date);
        console.log("actualDate", todaysDate)
        // todaysDate.setHours(0 ,0, 0, 0);
        // console.log("date", todaysDate)

        if(flag == 0){

            const totalStudents = await Student.find({ isDeleted: false}).countDocuments();
            const todaysAttendancePresent = await Attendance.find({ status: true, date: todaysDate}).countDocuments();

            const data = {

                totalStudents : totalStudents,
                totalBatches: 5,
                todaysAttendancePresent : todaysAttendancePresent
            }

            res.status(200).send(data)

        }
        else {

            const batchId = req.query.batchId;

            const totalStudents = await Student.find({batchId: batchId, isDeleted: false}).countDocuments();
            const todaysAttendancePresent = await Attendance.find({batchId: batchId, status: true, date: todaysDate}).countDocuments();

            const data = {

                totalStudents: totalStudents,
                batch: `Batch${flag}`,
                todaysAttendancePresent: todaysAttendancePresent

            }

            res.status(200).send(data);

        }

    }

    catch(error){
        res.status(400).send({error: error.message, stack: error.stack});
    }

}


const getMonthlyAttendanceSummary = async(req, res) => {

    try{

        const batchId = req.query.batchId;
        const month = req.body.month//batchId=123&month=2026-02
        const [year, m] = month.split("-").map(Number);

        // const startDate = new Date(year, m-1, 1);
        // console.log("startDate", startDate)
        // // startDate.setHours(0, 0,0,0);

        // const endDate = new Date(year, m, 0);
        // console.log("endDate", endDate)
        // // endDate.setHours(23, 59, 59, 999);


        const startDate = new Date(Date.UTC(year, m - 1, 1, 0, 0, 0));
        console.log("startDate", startDate)
        const endDate = new Date(Date.UTC(year, m, 0, 23, 59, 59, 999));
        console.log("endDate", endDate)

        const monthlyData = await Attendance.aggregate([
            {
                $match: {
                    batchId: batchId,
                    date: { $gte: startDate, $lte: endDate}
                }
            },
                {
                    $group: {
                        _id: "$studentId",
                        name: { $first: "$name" },
                        present: {
                            $sum: { $cond : ["$status", 1, 0]}
                        },
                        absent: {
                            $sum: { $cond : ["$status", 0, 1]}
                        }
                    }
                }
        ]);

        // console.log("monthlyData", monthlyData)

        const finalMonthlyData = await Promise.all(monthlyData.map(async(d) => {

            const total = d.present + d.absent;

            const data = {
                studentId: d._id,
                name: d.name,
                present: d.present,
                absent: d.absent,
                percentagePresent: total == 0 ? 0 : ((d.present/total) * 100).toFixed(2)

            }
            
            console.log("eachStudentPercentage", data)

            return data;
        }))

        // console.log("finalData", finalMonthlyData)
        
        res.status(200).send(finalMonthlyData)

    }

    catch(error){
        res.status(400).send({error: error.message, stack: error.stack})
    }
}
module.exports = {
    getAttendance,
    saveAttendanceStatus,
    getDashBoardMetrics,
    getMonthlyAttendanceSummary
}
