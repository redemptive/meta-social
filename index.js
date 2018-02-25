const ejs = require("ejs");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("static"));
const port = 3000;
const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/meta-social";
let posts;

async function databaseSetup() {
	//Check for the DB_HOST environment variable
	if (process.env.DB_HOST) {
		console.log(`Waiting for connection from ${process.env.DB_HOST}`);
		//Connect to the DB if the env variable is there
		const connection = await mongoose.createConnection(process.env.DB_HOST + "/lab-db").catch((err) => {
			if (err) {
				//Could not establish a connection
				console.log(`Could not connect to ${process.env.DB_HOST}, please check database IP address`);
				console.log("Then run 'export DB_HOST=mongodb://[database ip]'");
				console.log("Exiting...");
				process.exit();
			}
		});
		//Connection established
		//Set the schema of the database
		const schema = new Schema({
			userFirstName: String,
			userLastName: String
		});
		//Set up the model for communicating with the database
		Result = connection.model('Result', schema);
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
		Result.find((err, results) => {
			if (err) return console.log(err);
			res.render("index", {results: results});
		});
	});
	app.listen(port, () => {
		console.log("Server started on port " + port);
	});
}

databaseSetup();