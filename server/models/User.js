const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true,
        trim: true
    },
    googleId: {
        type: String
    },
    email: {
        type: String,
        required:true,
    },
    password:{
        type: String,
    },
    image:{
        type: String,
    },
    Bookmarks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bookmark",
        }
    ],
    token:{
        type:String
    },
    preferedCountry: {
        type: String
    }

});

module.exports = mongoose.model("User", userSchema);