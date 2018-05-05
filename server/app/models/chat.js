var mongoose = require('mongoose');

// Schema defines how chat messages will be stored in MongoDB
var ChatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAnswer: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Chat', ChatSchema);