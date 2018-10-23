//Imports
const ejs = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const app = express();
const bodyParser = require('body-parser');

//App configuration
app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import models
const User = require('./models/user');
const Post = require('./models/post');

// Import routes
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

//Variables
const port = 3000;

async function databaseSetup() {
	//Check for the DB_HOST environment variable
	if (process.env.DB_HOST) {
		console.log(`Waiting for connection from ${process.env.DB_HOST}`);
		//Connect to the DB if the env variable is there
		await mongoose.connect(process.env.DB_HOST + "/meta-social-db").then((result) => {
			//Connection established
			const connection = result;

			//Set up the model for communicating with the database
			console.log(`Connected sucessfully to ${process.env.DB_HOST}/meta-social-db`);
			//Now start the server
			console.log("Starting server...");
			startServer();
		}, (error) => {
			if (error) {
				//Could not establish a connection
				console.log(`Could not connect to ${process.env.DB_HOST}, please check database IP address`);
				console.log("Then run 'export DB_HOST=mongodb://[database ip]'");
				console.log("Exiting...");
				process.exit();
			}
		});
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
		User.find().then((users) => {
			res.render("index", {users: users});
		}, (error) => {
			console.log(error);
		});
	});

	app.listen(port, () => {
		console.log("Server started on port " + port);
	});
}

databaseSetup();