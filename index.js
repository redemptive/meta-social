//Imports
const ejs = require("ejs");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const app = express();
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const nodemon = require("nodemon");

//App configuration
app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Variables
const port = 3000;
let posts;

async function databaseSetup() {
	//Check for the DB_HOST environment variable
	if (process.env.DB_HOST) {
		console.log(`Waiting for connection from ${process.env.DB_HOST}`);
		//Connect to the DB if the env variable is there
		const connection = await mongoose.createConnection(process.env.DB_HOST + "/meta-social-db").catch((err) => {
			if (err) {
				//Could not establish a connection
				console.log(`Could not connect to ${process.env.DB_HOST}, please check database IP address`);
				console.log("Then run 'export DB_HOST=mongodb://[database ip]'");
				console.log("Exiting...");
				process.exit();
			}
		});
		//Connection established
		//Set the schemas of the database
		const userSchema = new Schema({
			_id: Schema.Types.ObjectId,
			userFirstName: String,
			userLastName: String
		});
		const postSchema = new Schema({
			user: { type: Schema.Types.ObjectId, ref: 'User' },
			postContent: String
		});
		//Set up the model for communicating with the database
		User = connection.model('User', userSchema);
		Post = connection.model('Post', postSchema);
		console.log(`Connected sucessfully to ${process.env.DB_HOST}/meta-social-db`);
		//Now start the server
		console.log("Starting server...");
		startServer();
	} else {
		//User has no DB_HOST environment variable set for the db ip
		console.log("Oh no... no DB_HOST environment variable set. Cannot connect to DB.");
		console.log("Please run 'export DB_HOST=mongodb://[database ip]'");
		console.log("Exiting...");
		process.exit();
	}
}

function startServer() {
	app.get("/", (req, res) => {
		User.find((err, users) => {
			if (err) return console.log(err);
			res.render("index", {users: users});
		});
	});
	app.get("/users", (req, res) => {
		User.find((err, users) => {
			if (err) return console.log(err);
			res.render("users", {users: users});
		});
	});
	app.get("/posts", (req, res) => {
		Post.find((err, posts) => {
			console.log(posts);
			Post.populate(posts, 'user', (err, posts) => {
				console.log(posts);
				User.find((err, users) => {
					res.render("posts", {posts: posts, users: users});
				});
			});			
		});
	});
	app.post("/addPost", (req, res) => {
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
	app.post("/addUser", (req, res) => {
		//Post route for adding a result to the database
		console.log(`Post request recieved for ${req.url} from ${req.connection.remoteAddress}`);
		//Get current date
		let currentDate = new Date();
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
	app.listen(port, () => {
		console.log("Server started on port " + port);
	});
}

databaseSetup();