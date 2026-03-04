const mongoose = require("mongoose");
let schema = mongoose.Schema;

var StudentSchema = new mongoose.Schema({
    name: {type: String},
    batchId: {type: String},
    email: {type: String},
    status: {type: Boolean, default: false},
    isDeleted: {type: Boolean, default: false}
})

module.exports = mongoose.model("students", StudentSchema)