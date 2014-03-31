// Route index ===========================================================

module.exports = function(app, passport,lbConnect,lbConfig) {
    userview = require("./users")(app,passport);
    thingview = require("./things")(app,passport);
    authview = require("./authentication")(app,passport);
    sourceview = require("./source")(app,passport,lbConnect,lbConfig);


    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
      res.render('index'); // load the index.jade file
    });

    // application -------------------------------------------------------------
//    app.get('*', function(req, res) {
//      res.sendfile('../index'); // load the single view file (angular will handle the page changes on the front-end)
//    });

};
