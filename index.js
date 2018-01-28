const ejs = require("ejs");
const fs = require("fs");
const express = require("express");
const app = express();
app.set("view engine", "ejs");
const port = 3000;

function startServer() {
	app.get("/", (req, res) => {
		res.render("index", {
		});
	});
	app.get("/global.css", (req, res) => {
		res.writeHead(200, {'Content-Type': 'text/css'});
		res.write(fs.readFileSync("./index.css","utf-8"));
		res.end();
	});
	app.get("/script.js", (req, res) => {
		res.writeHead(200, {'Content-Type': 'text/javascript'});
		res.write(fs.readFileSync("./index.css","utf-8"));
		res.end();
	});
	app.listen(port, () => {
		console.log("Server started on port " + port);
	});
}

startServer();