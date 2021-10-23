const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    email: String,
    msg: String,
},{
    timestamps: true
});


module.exports = mongoose.model('feedback', feedbackSchema);