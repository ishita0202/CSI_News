const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg',
    },
    role: {
        type: String,
        default: 'user',
    },
    website: {
        type: String,
        default: '',
    },
    saved: [
        {
            type: mongoose.Types.ObjectId, 
            ref: 'user'
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema);