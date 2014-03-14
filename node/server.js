// server.js

	// set up ========================
	var express  = require('express');
  var passport = require('passport');
	var app      = express(); 								// create our app w/ express
//	var mongoose = require('mongoose'); 					// mongoose for mongodb
var port = process.env.PORT || 8080;

	// configuration =================

	//mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	// connect to mongoDB database on modulus.io

	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
		app.use(express.bodyParser()); 							// pull information from html in POST
		app.use(express.methodOverride()); 						// simulate DELETE and PUT

  	app.set('view engine', 'jade'); // set up ejs for templating
  	// required for passport
  	app.use(express.session({ secret: 'sunshineonmyshouldermakesmehappy' })); // session secret
  	app.use(passport.initialize());
  	app.use(passport.session()); // persistent login sessions
  	app.use(flash()); // use connect-flash for flash messages stored in session
	});

// routes ======================================================================
require('./app/models.js'); // load our routes and pass in our app and fully configured passport

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport





// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
