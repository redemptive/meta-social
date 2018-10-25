const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');

router.get("/", (req, res) => {
    User.find().then((users) => {
        res.render("users", {users: users});
    }, (error) => {
        console.log(error);
    });
});

router.post("/", (req, res) => {
    //Post route for adding a result to the database
    console.log(`Post request recieved for ${req.url} from ${req.connection.remoteAddress}`);
    //Create new Result object with the params
    let newUser = User({
        _id: new mongoose.Types.ObjectId(),
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName
    });
    //Save the new object to the db
    newUser.save();
    res.redirect("/users");
    console.log(`Sent incoming data to db at ${process.env.DB_HOST}`);
});

module.exports = router;