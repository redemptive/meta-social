const ejs = require("ejs");
const fs = require("fs");
const express = require("express");
const app = express();
app.set("view engine", "ejs");
const port = 3000;
const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/meta-social";
let posts;

function connectToDB(dbUrl) {
	mongoClient.connect(dbUrl, function(err, db) {
	  if (err) console.log(err);
	  console.log("Database created!");
	  var dbo = db.db("mydb");
	  dbo.createCollection("customers", function(err, res) {
	    if (err) console.log(err);
	    console.log("Collection created!");
	    db.close();
	  });
	});
}

function startServer() {
	app.get("/", (req, res) => {
		res.render("index", {
		});
	});
	app.get("/global.css", (req, res) => {
		console.log("Recieved request for global.css");
		res.writeHead(200, {'Content-Type': 'text/css'});
		res.write(fs.readFileSync("global.css", "utf-8"));
		res.end();
	});
	app.get("/script.js", (req, res) => {
		console.log("Recieved request for script.js");
		res.writeHead(200, {'Content-Type': 'text/javascript'});
		res.write(fs.readFileSync("script.js", "utf-8"));
		res.end();
	});
	app.listen(port, () => {
		console.log("Server started on port " + port);
	});
}

connectToDB(url);
startServer();