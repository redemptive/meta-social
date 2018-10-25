const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');

router.get("/", (req, res) => {
    User.find().then((users) => {
        res.render("index", {users: users});
    }, (error) => {
        console.log(error);
    });
});

module.exports = router;