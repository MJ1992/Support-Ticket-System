var mongoose = require('mongoose');
var User = require('../models/user');

var ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    userInfo: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        },

        name: {
            type: String


        },
        email: {
            type: String

        },
        mobile: {
            type: Number

        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: { type: Boolean, default: false }

});

module.exports = mongoose.model('Ticket', ticketSchema);