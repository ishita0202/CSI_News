const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId
},{
    timestamps: true
});

module.exports = mongoose.model('comment', commentSchema);