util = require('util');

// routes for users ============================================================


module.exports = function(app, lb) {
  console.log("in users.js lb is " + util.inspect(lb));
  User = require('./../models/users.js')(lb);

  app.get('/v1/user/:user_id', function(req, res) {
    console.log("User is" + util.inspect(User));
    User.get(req.params.user_id,function(err, user) {
      if(err) {
        res.status(404);
        res.type('txt').send("User not found");
      } else {
        userjson = {  id: user.id,
                      name: user.name,
                      bio: user.bio,
                      url: user.url
                    };
        console.log("about to send this user" + JSON.stringify(userjson));
        res.send(userjson);
      }
    });
  });


  // app.get('/v1/user/', function(req, res) {
  //   Users.get({
  //     id : req.params.user_id
  //   }, function(err, todo) {
  //     if (err)
  //       res.send(err);
  //     });
  //   });
  //
  // app.get('/v1/user/neighbors', function(req, res) {
  //   Users.get({
  //     id : req.params.user_id
  //   }, function(err, todo) {
  //     if (err)
  //       res.send(err);
  //     });
  //   });

    app.get('/v1/user/:user_id/neighbors', function(req, res) {
      User.getNeighbors(req.params.user_id, req.query.threshold, function(err,neighbors) {
        if(err) {
          res.status(404);
          res.type('txt').send("Neighbors not found");
        } else {
          userjson = { neighbors: neighbors };
          res.send(neighbors);
        }
      });
    });

    app.get('/v1/user/:user_id/movies', function(req, res) {
      console.log("in /v1/user/:id/movies: with User as " + util.inspect(User));
      User.getThings(req.params.user_id, "movie", function(err,things) {
        if(err) {
          res.status(404);
          res.type('txt').send("Things not found");
        } else {
          res.send(things);
        }
      });
    });
};
