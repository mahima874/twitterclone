const router = require('express').Router();
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');

//write a post
router.route('/writepost').post((req, res) => {
    const {username, post} = req.body;

    if(!post) return res.status(400).json({msg: 'please write something before post'});

    const newPost = new Post({
        username,
        post
    });

    newPost.save()
        .then(post => res.json({
            post:{
                id: post.id,
                msg: 'your post created successfully'
            }
        }))
        .catch(err => res.json(err))
});

//show all posts
router.route('/').get((req, res) => {
    Post.find()
        .then(post => res.json(post))
        .catch(err => res.json(err))
});

//write a comment
router.route('/comment').post((req, res) => {
    const {username, post, comment} = req.body;

    if(!comment) return res.status(400).json({msg: 'please write something before comment'});

    const newComment = new Comment({
        username,
        post,
        comment
    });

    newComment.save()
        .then(comment => res.json({
            comment:{
                id: comment.id,
                msg: 'your comment created successfully'
            }
        }))
        .catch(err => res.json(err))
});

module.exports = router;