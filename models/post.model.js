const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    username: {
        type: String,
        required: true,
        trim: true
    },
    post: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;