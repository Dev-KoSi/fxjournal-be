const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    image: {
        url: String,
        publicId: String
    },
    caption: String,
    fav: Boolean,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Logs', logSchema);