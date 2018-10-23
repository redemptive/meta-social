const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userFirstName: String,
    userLastName: String
});

module.exports = mongoose.model('User', userSchema);