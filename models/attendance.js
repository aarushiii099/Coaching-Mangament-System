const mongoose = require("mongoose");
let schema = mongoose.Schema;

var attendanceSchema = new mongoose.Schema({

    studentId : {type: String},
    name: {type: String},
    status: {type: Boolean, default: false},
    isDeleted :{type: Boolean, default: false},
    batchId: {type: String},
    date: {type : Date}
})

module.exports = mongoose.model("attendance", attendanceSchema)
