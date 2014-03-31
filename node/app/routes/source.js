// Routes for graph source load ================================================
var csv = require("ya-csv");
var util = require('util');
var async = require('async');
var Stream = require('stream');

function split(a, n) {
    var len = a.length,out = [], i = 0;
    while (i < len) {
        var size = Math.ceil((len - i) / n--);
        out.push(a.slice(i, i += size));
    }
    return out;
}

module.exports = function(app, passport,lbConnect,lbConfig) {

  // api ---------------------------------------------------------------------

  // return a thing
  app.get('/v1/graph/reload', function(req, res) {
    batchsize=500;
    res.setHeader("Content-Type", "text/html");
    res.write("<pre>");
    last = 0;
    // var stream = new Stream.Readable();
    var series, queue, csvstream;

    // stream.pipe(res);

    async.series([

      // Users
      function(callback) {
        lbConnect(lbConfig.default, function(err,api) {
          csvstream = csv.createCsvFileReader(__dirname + "/../../developer/users.csv", { columnsFromHeader: true });
          logicarray = [];
          queue = async.queue(function(task, next) {
            if(task.done) { next(); } else {
              execstring = task.join(" ");
              console.log("loading user batch: " + execstring);
              return api.exec('pfgraph', {
                        logic: execstring
                      }, function(err, result) {
                        if(err) {
                          console.log("Error: " + err.message);
                        } else {
                          res.write("added: " + execstring + "<br>\n");
                          next();
                        }
                      });
            }
          }, 1);

          csvstream.on('data', function(data) {
            console.log("got a line and pushing it onto the queue");
            logicarray.push("+person(p), +person_id[p]=" + data.id + ", +person_name[p]=\"" + data.name + "\".");
          });

          queue.drain = function() {
            console.log("in queue.drain()");
            callback(null,"Users loaded");
          };


          csvstream.on('end', function() {
            console.log("got the 'end' event on csvstream. Nothing to 'resume'.");
            batches = split(logicarray,Math.ceil(logicarray.length/batchsize));
            queue.push(batches);
          });
        });
      },

      // Movies
      function(callback) {
        lbConnect(lbConfig.default, function(err,api) {
          csvstream = csv.createCsvFileReader(__dirname + "/../../developer/movies.csv", { columnsFromHeader: true });
          logicarray = [];
          queue = async.queue(function(task, next) {
            if(task.done) { next(); } else {
              execstring = task.join(" ");
              console.log("Sending a batch of movies");
              return api.exec('pfgraph', {
                        logic: execstring
                      }, function(err, result) {
                        if(err) {
                          console.log("Error: " + err.message);
                        } else {
                          res.write("added: " + execstring + "<br>\n");
                          next();
                        }
                      });
            }
          }, 1);

          csvstream.on('data', function(data) {
            console.log("got a line and pushing it onto the queue");
            data.title = escape(data.title);
            logicarray.push("+movie(m), +thing_id[m]=" + data.id + ", +movie_title[m] = \"" + data.title + "\".");
          });

          queue.drain = function() {
            console.log("in queue.drain()");
            callback(null,"Movies loaded");
          };

          csvstream.on('end', function() {
            console.log("got the 'end' event on csvstream. Nothing to 'resume'.");
            batches = split(logicarray, Math.ceil(logicarray.length/batchsize));
            queue.push(batches);
          });
        });
      },

      // Movie ratings
      function(callback) {
        lbConnect(lbConfig.default, function(err,api) {
          csvstream = csv.createCsvFileReader(__dirname + "/../../developer/ratings.csv", { columnsFromHeader: true });
          logicarray = [];
          queue = async.queue(function(task, next) {
            if(task.done) { next(); } else {
              execstring = task.join(" ");
              console.log("loading ratings batch");
              return api.exec('pfgraph', {
                        logic: execstring
                      }, function(err, result) {
                        if(err) {
                          console.log("Error: " + err.message);
                        } else {
                          res.write("added: " + execstring + "<br>\n");
                          next();
                        }
                      });
            }
          }, 1);

          csvstream.on('data', function(data) {
            console.log("got a line and pushing it onto the queue");
            logicarray.push("+person_rates_thing[" + data.userid + "," + data.movieid + "] = " + data.rating +  ".");
          });

          queue.drain = function() {
            console.log("in queue.drain()");
            callback(null,"Ratings loaded");
          };


          csvstream.on('end', function() {
            console.log("got the 'end' event on csvstream. Nothing to 'resume'.");
            batches = split(logicarray, Math.ceil(logicarray.length/batchsize));
            queue.push(batches);
          });
        });
      },

      // Distances
      function(callback) {
        lbConnect(lbConfig.default, function(err,api) {
          csvstream = csv.createCsvFileReader(__dirname + "/../../developer/prod-distances.csv", { columnsFromHeader: true });
          logicarray = [];
          queue = async.queue(function(task, next) {
            if(task.done) { next(); } else {
              execstring = task.join(" ");
              console.log("loading batch of distances");
              return api.exec('pfgraph', {
                        logic: execstring
                      }, function(err, result) {
                        if(err) {
                          console.log("Error: " + err.message);
                        } else {
                          res.write("added: " + execstring + "<br>\n");
                          next();
                        }
                      });
            }
          }, 1);

          csvstream.on('data', function(data) {
            console.log("got a line and pushing it onto the queue");
            logicarray.push("+people_distance[" + data.userida + "," + data.useridb + "] = " + Math.round(data.distance * 100) + ".");
          });

          queue.drain = function() {
            console.log("in queue.drain()");
            callback(null,"Distances loaded");
          };

          csvstream.on('end', function() {
            console.log("got the 'end' event on csvstream. Nothing to 'resume'.");
            batches = split(logicarray, Math.ceil(logicarray.length/batchsize));
            queue.push(batches);
          });
        });
      }

      ],

      function(err, results) {
        console.log("In async.series final callback");
        res.write(results.join("<br>"));
        res.write("</pre>");
        res.end();
      });




});
}
