const mongoose = require('mongoose');
const bookmarkSchema = new mongoose.Schema({

    title: {
        type: String,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    date: {
        type: Date,
    },
    source: {
        type: String,
    },
    author: {
        type: String,
    },
    newsUrl: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model("Bookmark", bookmarkSchema);
