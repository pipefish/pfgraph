'use strict';

var express = require('express');
var util = require('util');
/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');

// Setup Express
var app = express();
require('./lib/config/express')(app);
var lb = require('./lib/config/logicblox');
console.log("in server.js lb is " + util.inspect(lb));


// Express routes ======================================================================
require('./app/routes/')(app, lb); // load our routes and pass in our app and fully configured passport

// socket routes
// socket = require('./app/routes/socket')(lb);
// io.sockets.on('connection', socket);

// Start server
app.listen(config.port, config.ip, function () {
  console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
