const express = require("express"),
	app = express(),
	cors = require('cors'),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	mongo = require("mongodb").MongoClient,
	config = require("./config"),
	api = require("./server/routes/routes.js")(app, express),
	cfenv = require('cfenv'),
	appEnv = cfenv.getAppEnv(),
	server = require('http').createServer(app),
	gridfs = require('gridfs-stream'),
	path = require('path'),
	busboyBodyParser = require('busboy-body-parser');

	if(appEnv.isLocal){
		const a = require('dotenv');
		if(a) {
			a.load();
			console.log(appEnv.services["compose-for-mongodb"]);
		} else {
			console.log("dot env didnt load");
		}
		// Loads .env file into environment
	} else {
		console.log("no file");
	}
	// /******************************** 
	//  MongoDB Connection
	//  ********************************/
	
	// //Detects environment and connects to appropriate DB
	if(appEnv.isLocal){
	    mongoose.Promise = global.Promise;
		mongoose.connect(config.db, {
			useMongoClient: true,
		}).then(()=> {
			console.log("connected to mongoose");
		}).catch((err)=> {
			console.log(err);
		});

		mongo.connect(config.db)
			.then(()=> {
				console.log(`the database is ${config.db}`);
		}).catch((err) => {
			console.log(err);
		});
	}
	// Connect to MongoDB Service on Bluemix
	else if(!appEnv.isLocal) {
		var mongoDbUrl;
		var mongoDbOptions = {};
	    const mongoDbCredentials = appEnv.services["compose-for-mongodb"][0].credentials;
	    const ca = [new Buffer(mongoDbCredentials.ca_certificate_base64, 'base64')];
	    mongoDbUrl = mongoDbCredentials.uri;
	    mongoDbOptions = {
	      mongos: {
	        ssl: true,
	        sslValidate: true,
	        sslCA: ca,
	        poolSize: 1,
	        reconnectTries: 1
	      }
	    };
	
	    console.log("Your MongoDB is running at ", mongoDbUrl);
	    mongoose.connect(mongoDbUrl, mongoDbOptions); // connect to our database
	}
	else{
	    console.log('Unable to connect to MongoDB.');
	}
	
	app.enable('trust proxy');
	// Use SSL connection provided by Bluemix. No setup required besides redirecting all HTTP requests to HTTPS
	if (!appEnv.isLocal) {
		app.use(function (req, res, next) {
			if (req.secure) // returns true is protocol = https
				next();
			else
				res.redirect('https://' + req.headers.host + req.url);
		});
	}
	



app.use(cors());
// app.options('*',cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(busboyBodyParser({ limit: '10mb' }));  
app.use("/api",api);

server.listen(appEnv.port, appEnv.bind, (err)=> {
	// console.log(`listening to port ${appEnv.port}`);
});

module.exports = {
	mongoDbUrl
};