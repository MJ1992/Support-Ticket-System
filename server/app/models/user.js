var mongoose = require('mongoose');
var Ticket = require('../models/ticket');
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true

    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

module.exports = mongoose.model('User', userSchema);