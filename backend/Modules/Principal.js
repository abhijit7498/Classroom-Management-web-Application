const mongoose = require('mongoose');

const Pdata = new mongoose.Schema({
    Username: { type: String },
    Password: { type: String },
    role: { type: String }
})
module.exports = mongoose.model('Principal', Pdata);