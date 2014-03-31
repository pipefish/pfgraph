// Routes for things ===========================================================

module.exports = function(app, passport) {

  // api ---------------------------------------------------------------------

  // return a thing
  app.get('/v1/things/:thing_id', function(req, res) {
    Things.get({
      id : req.params.thing_id
    }, function(err, todo) {
      if (err)
        res.send(err);

      });
    });

};
