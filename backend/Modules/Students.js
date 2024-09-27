const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    Username: { type:String, require: true },
    Password: { type:String, require: true },
    Classname: { type:String, require: true },
    Division: { type:String, require: true },
    StudentId: { type:String, require: true },
    role:{type:String ,default:"Teacher"},
    CreatedAt:{type:Date, default:Date.now},

});

module.exports = mongoose.model('Students', StudentSchema);