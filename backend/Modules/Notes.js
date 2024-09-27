const mongoose = require('mongoose');
const NotesSchema = new mongoose.Schema({
    Classname: { type: String },
    Division: { type: String },
    Subject: { type: String },
    Textinfo: { type: String },
    Title: { type: String },
    pdf: { type: String, default: null }, // Optional PDF field
    CreatedAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Notes', NotesSchema)