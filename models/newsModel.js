const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: String,
    images: {
        type: Array,
        required: true
    },
    content: String,
    category: String,
    likes: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    comments: [{type: mongoose.Types.ObjectId, ref: 'comment'}],
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
},{
    timestamps: true
});

module.exports = mongoose.model('news', newsSchema);