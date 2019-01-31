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
All you need to do here is `docker-compose up`! This will pull down a nodejs 10 container and build with the Dockerfile. I have already made a mongo-data folder which is used as persistant storage for the mongodb container which is also pulled from the docker registry.

### Local
Clone the repo and run `npm install`. Please also have a local, cloud or whatever mongodb instance running.

The app uses a DB_HOST environment variable to get the connection address for mongodb. Run `export DB_HOST='mongodb://<address>:<port>'` for linux and mac or `$env:DB_HOST = 'mongodb://<address>:<port>'` for windows powershell. Then run `nodejs server.js` for a linux installation or `node server.js` for a windows one.