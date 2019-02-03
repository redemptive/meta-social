## Title
# meta-social

## Description
A social network implementation in node.js

## Technologies

### Back End
This is a nodejs server application connecting to a mongodb database on the back end. The app uses an rmvc architecture.

### Front End

The front end uses HTML5, CSS and Javascript\Jquery on the front end.

## Installation and Usage

First of all clone this repo down

### Docker-Compose (Linux containers)
All you need to do here is `docker-compose up`! This will build the application and infrastructure like so:

localhost:8080 <-> Nginx Proxy <-> Web Server <-> mongoDB

#### Nginx Proxy
This Nginx container wil act as a reverse proxy, forwarding requests from the exposed localhost port 8080 to the private web container port 3000

#### Web Server
This nodejs 10 container serves on private port 3000 and contains the application code.

#### MongoDB
This is a mongodb container which will serve on the standard port 27017. The project folder mongo-data will be mounted by the container for persistant storage at /data/db.

### Local
Clone the repo and run `npm install`. Please also have a local, cloud or whatever mongodb instance running.

The app uses a DB_HOST environment variable to get the connection address for mongodb. Run `export DB_HOST='mongodb://<address>:<port>'` for linux and mac or `$env:DB_HOST = 'mongodb://<address>:<port>'` for windows powershell. Then run `nodejs server.js` for a linux installation or `node server.js` for a windows one.