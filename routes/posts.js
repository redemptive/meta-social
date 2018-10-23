const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');

router.get("/", (req, res) => {
    Post.find().then((posts) => {
        Post.populate(posts, 'user').then((posts) => {
            User.find().then((users) => {
                res.render("posts", {posts: posts, users: users});
            }, (error) => {
                console.log(`Error loading users: ${error}`);
            });
        });	
    }, (error) => {
        console.log("Error loading posts");
    });		
});

router.post("/", (req, res) => {
    //Post route for adding a result to the database
    console.log(`Post request recieved for ${req.url} from ${req.connection.remoteAddress}`);
    //Create new Post object with the params
    let newPost = Post({
        user: req.body.userId,
        postContent: req.body.postContent
    });
    //Save the new object to the db
    newPost.save((err) => {
        if (err) return console.log(err);
    });
    //Get current date
    let currentDate = new Date();
    res.redirect("/posts");
     console.log(`Sent incoming data to db at ${process.env.DB_HOST}`);
});

module.exports = router;