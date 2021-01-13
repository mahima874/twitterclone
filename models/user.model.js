const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: Boolean,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    }, 
    username: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;