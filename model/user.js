const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    email: String,
    password: String,
    username: {type: String, default: 'user'},
    image: String,
    bio: {type: String, default: 'bio'}

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);