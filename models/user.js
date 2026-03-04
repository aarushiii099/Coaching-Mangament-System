const mongoose = require("mongoose");
let schema = mongoose.Schema;


var userSchema = new mongoose.Schema({

    userName: { type: String},
    email: { type: String},
    password: { type: String},
    isDeleted: {type: Boolean, default: false}

})

module.exports = mongoose.model("user", userSchema);