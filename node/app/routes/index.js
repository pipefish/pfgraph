var util = require('util');
var index = require('./../../lib/controllers');
// Route index ===========================================================

module.exports = function(app, lb) {
  console.log("in routes/index.js, lb is " + util.inspect(lb));
    userview = require("./users")(app,lb);
    thingview = require("./things")(app,lb);
    authview = require("./authentication")(app,lb);
    sourceview = require("./source")(app,lb);


    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
      res.render('index'); // load the index.jade file
    });

    // application -------------------------------------------------------------

    // // All undefined api routes should return a 404
    // app.route('/api/*')
    //   .get(function(req, res) {
    //     res.send(404);
    //   });

    // All other routes to use Angular routing in app/scripts/app.js
    app.route('/partials/*')
      .get(index.partials);
    app.route('/*')
      .get( index.index);



};
