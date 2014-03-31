// server.js

	// set up ========================
	var util = require('util');
	var express  = require('express');
  var passport = require('passport');
	var app      = express(); 								// create our app w/ express
	var lbConnect = require('logicblox-connectblox');
	console.log("lbConnect:" + util.inspect(lbConnect));
	var lbConfig = { default: { lbhome: __dirname + '/app/lib', host: "glmaster.pipefish.com" },
									   admin:  { admin: true, lbhome: __dirname + '/app/lib', host: "glmaster.pipefish.com" }
								};
  var port = process.env.PORT || 8080;
	//var io = require('socket.io').listen(app);


	// configuration =================

	//mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	// connect to mongoDB database on modulus.io

	app.configure(function() {
		//app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
		app.use(express.bodyParser()); 							// pull information from html in POST
		app.use(express.methodOverride()); 						// simulate DELETE and PUT

  	app.set('view engine', 'jade'); // set up ejs for templating
		app.set('views',__dirname + '/app/views');
  	// required for passport
  	app.use(express.session({ secret: 'sunshineonmyshouldermakesmehappy' })); // session secret
  	app.use(passport.initialize());
  	app.use(passport.session()); // persistent login sessions
  	//app.use(flash()); // use connect-flash for flash messages stored in session
	});

// routes ======================================================================
require('./app/models/')(lbConnect,lbConfig); // load our routes and pass in our app and fully configured passport

// routes ======================================================================
require('./app/routes/')(app, passport, lbConnect, lbConfig); // load our routes and pass in our app and fully configured passport

// socket route
//io.sockets.on('connection', require('./routes/socket'));




// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
