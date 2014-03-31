// routes for users ============================================================

module.exports = function(app, passport) {

  app.get('/v1/user/:user_id', function(req, res) {
    Users.get({
      id : req.params.user_id
    }, function(err, todo) {
      if (err)
        res.send(err);
      });
    });

  app.get('/v1/user/', function(req, res) {
    Users.get({
      id : req.params.user_id
    }, function(err, todo) {
      if (err)
        res.send(err);
      });
    });

};
