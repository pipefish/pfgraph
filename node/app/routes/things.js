var util = require('util');

// Routes for things ===========================================================



module.exports = function(app, lb) {
  Thing = require('./../models/things.js')(lb);

  app.get('/v1/things/:thing_id', function(req, res) {
    Thing.get(req.params.thing_id,function(err, thing) {
      if(err) {
        res.status(404);
        res.type('txt').send("Thing not found");
      } else {
        thingjson = {  id: thing.id,
                      title: thing.title
                    };
        console.log("about to send this thing" + JSON.stringify(thingjson));
        res.send(thingjson);
      }
    });
  });


  app.get('/v1/thing/', function(req, res) {
    Things.get({
      id : req.params.thing_id
    }, function(err, todo) {
      if (err)
        res.send(err);
      });
    });

  app.get('/v1/thing/neighbors', function(req, res) {
    Things.get({
      id : req.params.thing_id
    }, function(err, todo) {
      if (err)
        res.send(err);
      });
    });
};
