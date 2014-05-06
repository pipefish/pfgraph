var model = require('nodejs-model');
var util = require('util');

module.exports = function(lb) {

console.log("Inside the thing model");
//create a new model definition _User_ and define _name_/_password_ attributes
  Thing = model("Thing")
            .attr('id',{})
            .attr('type', {});
  //           .attr('url',{})
  //           .attr('bio', {})
  //           .attr('neighbors');
  //
  //
  // User.get = function(id,callback) {
  //   p=User.create();
  //   lbConnect(lbConfig.default, function(err,api) {
  //     logic = "_(name,url,bio) <- personrecord(" + id + ",name,url,bio)."
  //     console.log("in User model querying with this logic:" + logic);
  //     api.query("pfgraph", { logic: logic } , function(err,result) {
  //       if(err) {
  //         callback(err.message,null);
  //       } else {
  //         console.log("query result is " + util.inspect(result[0]));
  //         p.id=id;
  //         console.log("name is " + result[0][0].value);
  //         p.name = result[0][0].value;
  //         p.url = result[0][1].value;
  //         p.bio = result[0][2].value;
  //         callback(null,p);
  //       }
  //     });
  //   });
  // }
  //
  // User.getNeighbors = function(id,threshold,callback) {
  //   lbConnect(lbConfig.default, function(err,api) {
  //     logic = "_(people,distance) <- neighbors(" + id + "," + threshold + ",people), people_distance[" + id + ",people]=distance.";
  //     console.log("in User model querying with this logic:" + logic);
  //     api.query("pfgraph", { logic: logic } , function(err,result) {
  //       if(err) {
  //         callback(err.message,null);
  //       } else {
  //         console.log("query result is " + util.inspect(result));
  //         var index =0;
  //         var neighbors = []
  //         for(index=0;index < result.length; index++) {
  //           neighbors.push({
  //               neighbor: result[index][0].value,
  //               distance: result[index][1].value
  //           });
  //         }
  //         callback(null,neighbors);
  //       }
  //     });
  //   });
  // }
  //
  //
  //
  // User.toJSON = function () {
  //   return {
  //     id: p.id,
  //     name:  p.name,
  //     url: p.url,
  //     bio: p.bio
  //   }
  // }

  return Thing;
};
