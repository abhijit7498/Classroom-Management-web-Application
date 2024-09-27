const mongoose =require('mongoose');

const TeacherSchema=new mongoose.Schema({
    Username:{type:String, require:true},
    Password:{type:String, require:true},
    role:{type:String ,default:"Teacher"},
    CreatedAt:{type:Date, default:Date.now}

})
module.exports=mongoose.model('TeachersLogin',TeacherSchema)