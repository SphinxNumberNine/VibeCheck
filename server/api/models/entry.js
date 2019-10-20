const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    content: {type: String, required: true},
    username: {type: String, required: true},
    color: {type: String, required: true},
    image: {type: String, required: true},
    date: {type: String, required: true},
    forum: {type: String, required: false},
    comments: [{
        content: {type: String, required: true},
        createdAt: {type: String, required: true},
        username: {type: String, required: true}
    }]
});

module.exports = mongoose.model('Entry', entrySchema);