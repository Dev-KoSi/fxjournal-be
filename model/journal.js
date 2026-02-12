const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    image: String,
    caption: String,
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        require: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Journal', journalSchema);