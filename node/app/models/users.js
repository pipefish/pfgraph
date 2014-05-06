var model = require('nodejs-model');
var util = require('util');

module.exports = function(lb) {

console.log("Inside the user model, lb is " + util.inspect(lb));
//create a new model definition _User_ and define _name_/_password_ attributes
  User = model("User")
            .attr('id',{})
            .attr('name', {})
            .attr('url',{})
            .attr('bio', {})
            .attr('neighbors')
            .attr('things');


  User.get = function(id,callback) {
    p=User.create();
    lb.conn(lb.config.default, function(err,api) {
      logic = "_(name,url,bio) <- personrecord(" + id + ",name,url,bio)."
      console.log("in User model querying with this logic:" + logic);
      api.query("pfgraph", { logic: logic } , function(err,result) {
        if(err) {
          callback(err.message,null);
        } else {
          console.log("query result is " + util.inspect(result[0]));
          p.id=id;
          console.log("name is " + result[0][0].value);
          p.name = result[0][0].value;
          p.url = result[0][1].value;
          p.bio = result[0][2].value;
          callback(null,p);
        }
      });
    });
  }

  User.getNeighbors = function(id,threshold,callback) {
    lb.conn(lb.config.default, function(err,api) {
      logic = "_(people,distance) <- neighbors(" + id + "," + threshold + ",people), people_distance[" + id + ",people]=distance.";
      console.log("in User model querying with this logic:" + logic);
      api.query("pfgraph", { logic: logic } , function(err,result) {
        if(err) {
          callback(err.message,null);
        } else {
          console.log("query result is " + util.inspect(result));
          var index =0;
          var neighbors = []
          for(index=0;index < result.length; index++) {
            neighbors.push({
                neighbor: result[index][0].value,
                distance: result[index][1].value
            });
          }
          callback(null,neighbors);
        }
      });
    });
  }

  User.getThings = function(id,typestring,callback) {
    if(["movie"].indexOf(typestring) < 0) {
      callback("Error: bad type", null);
    }
    lb.conn(lb.config.default, function(err,api) {
      logic = "_(thing_id[movie],movie_title[movie],rating) <- person_rates_thing[" + id + "," + typestring + "]=rating."
      console.log("in User model querying with this logic:" + logic);
      api.query("pfgraph", { logic: logic } , function(err,result) {
        if(err) {
          callback(err.message,null);
        } else {
          console.log("query result is " + util.inspect(result));
          var index =0;
          var things = []
          for(index=0;index < result.length; index++) {
            things.push({
                id: result[index][0].value,
                name: unescape(result[index][1].value),
                rating: result[index][2].value
            });
          }
          callback(null,things);
        }
      });
    });
  }

  User.toJSON = function () {
    return {
      id: p.id,
      name:  p.name,
      url: p.url,
      bio: p.bio
    }
  }

  return User;
};
