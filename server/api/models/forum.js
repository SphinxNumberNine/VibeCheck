const mongoose = require('mongoose');

const forumSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subject: {type: String, required: true}
});

module.exports = mongoose.model('Forum', forumSchema);