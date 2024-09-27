const mongoose =require('mongoose')
const TimetableSchema = new mongoose.Schema({
    Classinfo: {
        Classname: String,
        Division: String,
        Lecturehall: String,
    },
    Timetable: { type: [[String]], required: true }, // 2D array of strings
    Createat: { type: Date, default: Date.now },
});
const Timetables = mongoose.model('Timetable', TimetableSchema);
module.exports=Timetables