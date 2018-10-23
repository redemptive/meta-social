const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    postContent: String
});

module.exports = mongoose.model('Post', postSchema);