const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    image: {
        url: String,
        publicId: String
    },
    caption: String,
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        require: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Posts', journalSchema);